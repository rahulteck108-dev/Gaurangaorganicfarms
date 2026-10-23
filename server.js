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

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[character]));
}

async function sendEmail({ to, subject, html }) {
    if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) {
        console.error('Email not sent: configure RESEND_API_KEY and MAIL_FROM on the backend.');
        return 'not_configured';
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: process.env.MAIL_FROM,
                to: [to],
                subject,
                html
            }),
            signal: AbortSignal.timeout(10000)
        });

        if (!response.ok) {
            const result = await response.json().catch(() => ({}));
            console.error(`Email provider rejected message (${response.status}):`, result.message || result.name || 'Unknown provider error');
            return 'provider_rejected';
        }

        return 'sent';
    } catch (error) {
        console.error('Email provider request failed:', error.message);
        return 'provider_unavailable';
    }
}

async function sendWelcomeEmail({ fullname, email }) {
    return sendEmail({
        to: email,
        subject: 'Welcome to Gauranga Organic Farm',
        html: `<h2>Welcome, ${escapeHtml(fullname)}!</h2>
               <p>Your Gauranga Organic Farm account has been created successfully.</p>
               <p>Thank you for joining our organic community.</p>`
    });
}

async function sendLoginNotice({ fullname, email }) {
    return sendEmail({
        to: email,
        subject: 'Sign-in to your Gauranga Organic Farm account',
        html: `<h2>Hello, ${escapeHtml(fullname)}.</h2>
               <p>Your Gauranga Organic Farm account was just signed in to.</p>
               <p>If this wasn't you, please reset your password and contact our support team.</p>`
    });
}

// 2. Signup
app.post('/api/auth/signup', async (req, res) => {
    const { fullname, mobile, password } = req.body;
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
    if (!fullname || !email || !mobile || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Enter a valid email address.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (fullname, email, mobile, password) VALUES (?, ?, ?, ?)', 
            [fullname, email, mobile, hashedPassword], 
            async function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Email already exists.' });
                    }
                    console.error('Signup database insert failed:', err.message);
                    return res.status(500).json({ error: err.message });
                }
                const emailStatus = await sendWelcomeEmail({ fullname, email });
                res.status(201).json({
                    message: 'User created successfully',
                    id: this.lastID,
                    emailSent: emailStatus === 'sent',
                    emailStatus
                });
            }
        );
    } catch (err) {
        console.error('Signup failed:', err.message);
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
        const emailStatus = await sendLoginNotice({ fullname: user.fullname, email: user.email });
        res.json({
            message: 'Login successful',
            user: userData,
            emailSent: emailStatus === 'sent',
            emailStatus
        });
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
async function sendOrderEmails({ orderId, items, total, formData }) {
    const rows = items.map(item =>
        `<li>${escapeHtml(item.title || `Product #${item.id}`)} &times; ${escapeHtml(item.quantity)} — ₹${escapeHtml(item.price)}</li>`
    ).join('');
    const shippingDetails = ['name', 'email', 'phone', 'address', 'city', 'state', 'zip']
        .filter(key => formData[key])
        .map(key => `<p><b>${escapeHtml(key)}:</b> ${escapeHtml(formData[key])}</p>`)
        .join('');
    const customerEmail = formData.email.trim();

    const customerEmailStatus = await sendEmail({
        to: customerEmail,
        subject: `Your Gauranga Organic Farm order #${orderId} is placed`,
        html: `<h2>Thank you for your order, ${escapeHtml(formData.name || 'Customer')}!</h2>
               <p>Your order has been placed successfully.</p>
               <p><b>Order ID:</b> ${escapeHtml(orderId)}</p>
               <p><b>Order total:</b> ₹${escapeHtml(total)}</p>
               <h3>Items</h3><ul>${rows}</ul>
               <h3>Delivery details</h3>${shippingDetails}`
    });

    let ownerEmailStatus = process.env.OWNER_EMAIL ? 'not_sent' : 'not_configured';
    if (process.env.OWNER_EMAIL) {
        ownerEmailStatus = await sendEmail({
            to: process.env.OWNER_EMAIL,
            subject: `New order #${orderId} - ₹${total}`,
            html: `<h2>New order received</h2>
                   <p><b>Order ID:</b> ${escapeHtml(orderId)}</p>
                   <p><b>Total:</b> ₹${escapeHtml(total)}</p>
                   <ul>${rows}</ul>
                   <h3>Customer delivery details</h3>${shippingDetails}`
        });
    }

    return { customerEmailStatus, ownerEmailStatus };
}
// 4. Create Order (Checkout)
app.post('/api/orders', (req, res) => {
    const { userId, items: submittedItems, cartItems, totalAmount: submittedTotal, formData } = req.body;
    const items = submittedItems || cartItems || [];

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid order data.' });
    }
    if (typeof formData?.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        return res.status(400).json({ error: 'A valid customer email is required for order confirmation.' });
    }

    const normalizedItems = items.map((item) => ({
        id: Number(item.id),
        title: typeof item.title === 'string' ? item.title.slice(0, 150) : '',
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

                    db.run('COMMIT', async (commitError) => {
                        if (commitError) {
                            console.error('Order commit failed:', commitError.message);
                            db.run('ROLLBACK');
                            return res.status(500).json({ error: 'Unable to place order.' });
                        }
                        const { customerEmailStatus, ownerEmailStatus } = await sendOrderEmails({
                            orderId,
                            items: normalizedItems,
                            total: totalAmount,
                            formData
                        });
                        res.status(201).json({
                            message: 'Order placed successfully',
                            orderId,
                            totalAmount,
                            emailSent: customerEmailStatus === 'sent',
                            emailStatus: customerEmailStatus,
                            ownerEmailSent: ownerEmailStatus === 'sent',
                            ownerEmailStatus
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
