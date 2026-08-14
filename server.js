const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./database');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Return user data (excluding password)
        const { password: _, ...userData } = user;
        res.json({ message: 'Login successful', user: userData });
    });
});

// 4. Create Order (Checkout)
app.post('/api/orders', (req, res) => {
    const { userId, items, totalAmount } = req.body;
    
    if (!items || items.length === 0 || !totalAmount) {
        return res.status(400).json({ error: 'Invalid order data.' });
    }

    db.run('INSERT INTO orders (user_id, total_amount) VALUES (?, ?)', 
        [userId || null, totalAmount], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const orderId = this.lastID;
            
            const stmt = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
            items.forEach(item => {
                stmt.run(orderId, item.id, item.quantity, item.price);
            });
            stmt.finalize();

            res.status(201).json({ message: 'Order placed successfully', orderId });
        }
    );
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
