const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    db.get('SELECT 1', (err) => {
        if (err) {
            console.error('Health check database query failed:', err.message);
            return res.status(503).json({ status: 'unavailable' });
        }
        res.json({ status: 'ok' });
    });
});

// ================= API ENDPOINTS =================

// 1. Get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// 2. Signup
app.post('/api/auth/signup', async (req, res) => {
    const { fullname, email, mobile, password } = req.body;
    if (!fullname || !email || !mobile || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)', 
            [fullname, email, mobile, hashedPassword], 
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Email already exists.' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ message: 'User created successfully', id: this.lastID });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// 3. Login
app.post('/api/auth/login', (req, res) => {
    const { email, identifier, password } = req.body;
    const loginId = (identifier || email || '').trim();
    if (!loginId || !password) {
        return res.status(400).json({ error: 'Email or mobile and password are required.' });
    }

    db.get('SELECT * FROM users WHERE email = ? OR mobile = ?', [loginId, loginId], async (err, user) => {
        if (err) {
            console.error('Login database query failed:', err.message);
            return res.status(500).json({ error: err.message });
        }
        try {
            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(401).json({ error: 'Invalid credentials.' });
            }
        } catch (error) {
            console.error('Password verification failed:', error.message);
            return res.status(500).json({ error: 'Unable to verify credentials.' });
        }

        const { password: _, ...userData } = user;
        res.json({ message: 'Login successful', user: userData });
    });
});

app.post('/api/auth/reset-password', async (req, res) => {
    const { email, mobile, newPassword } = req.body;
    if (!email || !mobile || !newPassword) {
        return res.status(400).json({ error: 'Email, mobile, and new password are required.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.run(
            'UPDATE users SET password = ? WHERE email = ? AND mobile = ?',
            [hashedPassword, email, mobile],
            function (err) {
                if (err) {
                    console.error('Password reset database update failed:', err.message);
                    return res.status(500).json({ error: 'Unable to reset password.' });
                }
                if (this.changes === 0) {
                    return res.status(404).json({ error: 'No user found with the provided email and mobile number.' });
                }
                res.json({ message: 'Password reset successful.' });
            }
        );
    } catch (error) {
        console.error('Password reset failed:', error.message);
        res.status(500).json({ error: 'Unable to reset password.' });
    }
});
// Order alert mail (Resend, HTTPS API)
const escapeHtml = (v) => String(v ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

async function sendOrderAlert({ orderId, items, total, formData }) {
    if (!process.env.RESEND_API_KEY || !process.env.OWNER_EMAIL) {
        console.log('Order alert skipped: mail env variables missing.');
        return;
    }
    try {
        const rows = (items || []).map(i =>
            `<li>${escapeHtml(i.name || i.title || 'Item')} x ${escapeHtml(i.quantity || i.qty || 1)}` +
            (i.price ? ` - Rs ${escapeHtml(i.price)}` : '') + `</li>`
        ).join('');
        const customer = escapeHtml(JSON.stringify(formData || {}));

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: 'Gauranga Organic Farm <onboarding@resend.dev>',
                to: [process.env.OWNER_EMAIL],
                subject: `New order #${orderId ?? ''} - Rs ${total ?? ''}`,
                html: `<h2>New order received</h2>
                       <p><b>Order ID:</b> ${escapeHtml(orderId)}</p>
                       <p><b>Total:</b> Rs ${escapeHtml(total)}</p>
                       <ul>${rows}</ul>
                       <p><b>Customer details:</b> ${customer}</p>`
            })
        });
        const result = await response.json();
        if (!response.ok) console.error('Resend error:', result);
        else console.log('Order alert sent:', result.id);
    } catch (err) {
        console.error('Order alert failed:', err.message);
    }
}
// 4. Create Order (Checkout)
app.post('/api/orders', (req, res) => {
    const { userId, items: submittedItems, cartItems, totalAmount: submittedTotal, formData } = req.body;
    const items = submittedItems || cartItems || [];

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid order data.' });
    }

    const normalizedItems = items.map((item) => ({
        id: Number(item.id),
        quantity: Number(item.quantity),
        price: Number(item.price)
    }));

    if (normalizedItems.some(item =>
        !Number.isInteger(item.id) || item.id < 1 ||
        !Number.isInteger(item.quantity) || item.quantity < 1 ||
        !Number.isFinite(item.price) || item.price < 0
    )) {
        return res.status(400).json({ error: 'Order items are invalid.' });
    }

    const totalAmount = Number.isFinite(Number(submittedTotal))
        ? Number(submittedTotal)
        : normalizedItems.reduce((total, item) => total + item.price * item.quantity, 0);

    if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
        return res.status(400).json({ error: 'Order total must be greater than zero.' });
    }

    db.serialize(() => {
        db.run('BEGIN TRANSACTION');
        db.run('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)',
            [userId ?? null, totalAmount],
            function (err) {
                if (err) {
                    console.error('Order creation failed:', err.message);
                    db.run('ROLLBACK');
                    return res.status(500).json({ error: 'Unable to place order.' });
                }

                const orderId = this.lastID;
                const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
                let orderItemError = null;

                normalizedItems.forEach((item) => {
                    stmt.run(orderId, item.id, item.quantity, item.price, (itemError) => {
                        if (itemError) {
                            orderItemError = itemError;
                            console.error('Order item creation failed:', itemError.message);
                        }
                    });
                });

                stmt.finalize((finalizeError) => {
                    if (orderItemError || finalizeError) {
                        console.error('Order item save failed:', (orderItemError || finalizeError).message);
                        db.run('ROLLBACK');
                        return res.status(500).json({ error: 'Unable to place order.' });
                    }

                    db.run('COMMIT', (commitError) => {
                        if (commitError) {
                            console.error('Order commit failed:', commitError.message);
                            db.run('ROLLBACK');
                            return res.status(500).json({ error: 'Unable to place order.' });
                        }
                     sendOrderAlert({ orderId, items, total: totalAmount, formData });
                        res.status(201).json({
                            message: 'Order placed successfully',
                            orderId,
                            totalAmount,
                            shipping: formData || null
                        });
                    });
                });
            }
        );
    });
});

app.post('/api/contact', (req, res) => {
    const { name, email, mobile, message } = req.body;
    if (!name || !email || !mobile || !message) {
        return res.status(400).json({ error: 'All contact fields are required.' });
    }

    db.run(
        'INSERT INTO contact_messages (name, email, mobile, message) VALUES (?, ?, ?, ?)',
        [name, email, mobile, message],
        function (err) {
            if (err) {
                console.error('Contact message save failed:', err.message);
                return res.status(500).json({ error: 'Unable to save your message.' });
            }
            res.status(201).json({ message: 'Message saved successfully.' });
        }
    );
});

app.post('/api/chat', (req, res) => {
    const message = typeof req.body.message === 'string' ? req.body.message.toLowerCase() : '';
    if (!message.trim()) {
        return res.status(400).json({ error: 'Message is required.' });
    }

    let reply = 'Thank you for reaching out! Please contact our support team for more help.';
    if (message.includes('hello') || message.includes('hi')) {
        reply = 'Hello! Welcome to Gauranga Organic Farm. How can I help you today?';
    } else if (message.includes('delivery') || message.includes('deliver')) {
        reply = 'We offer next-day delivery for orders placed before 6 PM.';
    } else if (message.includes('organic')) {
        reply = 'Our products are grown without synthetic pesticides.';
    } else if (message.includes('price') || message.includes('cost')) {
        reply = 'You can check current prices in the shop section.';
    } else if (message.includes('milk') || message.includes('ghee') || message.includes('dairy')) {
        reply = 'Our dairy products come from A2 Gir cows.';
    }
    res.json({ reply });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
