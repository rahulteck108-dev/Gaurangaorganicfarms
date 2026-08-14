const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDB();
    }
});

function initializeDB() {
    db.serialize(() => {
        // Create Products Table
        db.run(`CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            category TEXT NOT NULL,
            price REAL NOT NULL,
            unit TEXT NOT NULL,
            image TEXT NOT NULL
        )`);

        // Create Users Table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullname TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            mobile TEXT NOT NULL,
            password TEXT NOT NULL
        )`);

        // Create Orders Table
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            total_amount REAL,
            order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

        // Create Order Items Table
        db.run(`CREATE TABLE IF NOT EXISTS order_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id INTEGER,
            product_id INTEGER,
            quantity INTEGER,
            price REAL,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (product_id) REFERENCES products(id)
        )`);

        // Seed Products if table is empty
        db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (row.count === 0) {
                const products = [
                    { title: "Fresh Desi Tomatoes", category: "vegetables", price: 60, unit: "/ kg", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Pure A2 Gir Cow Milk", category: "dairy", price: 90, unit: "/ liter", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Organic Spinach (Palak)", category: "vegetables", price: 40, unit: "/ bunch", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Farm Fresh Mangoes", category: "fruits", price: 250, unit: "/ dozen", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Organic Potatoes", category: "vegetables", price: 45, unit: "/ kg", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Farm Fresh Carrots", category: "vegetables", price: 55, unit: "/ kg", image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Organic Red Onions", category: "vegetables", price: 35, unit: "/ kg", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Sweet Apples", category: "fruits", price: 180, unit: "/ kg", image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Ripe Bananas", category: "fruits", price: 60, unit: "/ dozen", image: "images/ripe_bananas.png" },
                    { title: "Fresh White Butter (Makhan)", category: "dairy", price: 600, unit: "/ kg", image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Traditional Farm Curd (Dahi)", category: "dairy", price: 120, unit: "/ kg", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=1200&auto=format&fit=crop&q=100" },
                    { title: "A2 Paneer (Cottage Cheese)", category: "dairy", price: 450, unit: "/ kg", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Fresh Watermelon", category: "fruits", price: 40, unit: "/ kg", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Organic Green Peas", category: "vegetables", price: 90, unit: "/ kg", image: "images/organic_green_peas.png" },
                    { title: "Organic Cabbage", category: "vegetables", price: 30, unit: "/ kg", image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Fresh Broccoli", category: "vegetables", price: 80, unit: "/ kg", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Organic Lemons", category: "fruits", price: 50, unit: "/ kg", image: "https://images.unsplash.com/photo-1590502593747-42298799482d?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Farm Fresh Oranges", category: "fruits", price: 120, unit: "/ dozen", image: "https://images.unsplash.com/photo-1549888834-3ec93abae044?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Sweet Papaya", category: "fruits", price: 40, unit: "/ kg", image: "https://images.unsplash.com/photo-1617112848504-f2bb177119dc?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Organic Garlic", category: "vegetables", price: 150, unit: "/ kg", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=100" },
                    { title: "Organic Cauliflower", category: "vegetables", price: 60, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Organic%20Cauliflower?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Eggplant", category: "vegetables", price: 40, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Eggplant?width=400&height=300&nologo=true" },
                    { title: "Organic Bell Peppers", category: "vegetables", price: 120, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Bell%20Peppers?width=400&height=300&nologo=true" },
                    { title: "Fresh Green Chilies", category: "vegetables", price: 80, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Green%20Chilies?width=400&height=300&nologo=true" },
                    { title: "Organic Ginger", category: "vegetables", price: 150, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Ginger%20Root?width=400&height=300&nologo=true" },
                    { title: "Fresh Coriander", category: "vegetables", price: 20, unit: "/ bunch", image: "https://image.pollinations.ai/prompt/Fresh%20Coriander%20Leaves?width=400&height=300&nologo=true" },
                    { title: "Organic Mint Leaves", category: "vegetables", price: 15, unit: "/ bunch", image: "https://image.pollinations.ai/prompt/Organic%20Mint%20Leaves?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Radish", category: "vegetables", price: 30, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Radish?width=400&height=300&nologo=true" },
                    { title: "Organic Beetroot", category: "vegetables", price: 50, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Beetroot?width=400&height=300&nologo=true" },
                    { title: "Fresh Bitter Gourd", category: "vegetables", price: 60, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Bitter%20Gourd?width=400&height=300&nologo=true" },
                    { title: "Organic Bottle Gourd", category: "vegetables", price: 40, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Bottle%20Gourd?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Ridge Gourd", category: "vegetables", price: 45, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Ridge%20Gourd?width=400&height=300&nologo=true" },
                    { title: "Organic Lady Finger", category: "vegetables", price: 55, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Lady%20Finger%20Okra?width=400&height=300&nologo=true" },
                    { title: "Fresh Cucumber", category: "vegetables", price: 35, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Cucumber?width=400&height=300&nologo=true" },
                    { title: "Organic Pumpkin", category: "vegetables", price: 25, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Pumpkin?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Sweet Potato", category: "vegetables", price: 40, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Sweet%20Potato?width=400&height=300&nologo=true" },
                    { title: "Organic Pomegranate", category: "fruits", price: 150, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Pomegranate?width=400&height=300&nologo=true" },
                    { title: "Fresh Guava", category: "fruits", price: 80, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Guava?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Grapes", category: "fruits", price: 120, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Grapes?width=400&height=300&nologo=true" },
                    { title: "Organic Pineapple", category: "fruits", price: 90, unit: "/ piece", image: "https://image.pollinations.ai/prompt/Organic%20Pineapple?width=400&height=300&nologo=true" },
                    { title: "Fresh Strawberries", category: "fruits", price: 200, unit: "/ box", image: "https://image.pollinations.ai/prompt/Fresh%20Strawberries?width=400&height=300&nologo=true" },
                    { title: "Organic Blueberries", category: "fruits", price: 350, unit: "/ box", image: "https://image.pollinations.ai/prompt/Organic%20Blueberries?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Kiwi", category: "fruits", price: 180, unit: "/ box", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Kiwi?width=400&height=300&nologo=true" },
                    { title: "Organic Cherries", category: "fruits", price: 400, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Cherries?width=400&height=300&nologo=true" },
                    { title: "Fresh Peach", category: "fruits", price: 160, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Peach?width=400&height=300&nologo=true" },
                    { title: "Organic Plum", category: "fruits", price: 140, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Plum?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Pear", category: "fruits", price: 120, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Pear?width=400&height=300&nologo=true" },
                    { title: "Organic Lychee", category: "fruits", price: 250, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Lychee?width=400&height=300&nologo=true" },
                    { title: "Fresh Custard Apple", category: "fruits", price: 100, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Custard%20Apple?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Chikoo", category: "fruits", price: 80, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Sapodilla%20Chikoo?width=400&height=300&nologo=true" },
                    { title: "Organic Dragon Fruit", category: "fruits", price: 220, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Dragon%20Fruit?width=400&height=300&nologo=true" },
                    { title: "Fresh Muskmelon", category: "fruits", price: 60, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Fresh%20Muskmelon?width=400&height=300&nologo=true" },
                    { title: "Organic Figs (Anjeer)", category: "fruits", price: 300, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Organic%20Figs?width=400&height=300&nologo=true" },
                    { title: "Farm Fresh Avocado", category: "fruits", price: 400, unit: "/ kg", image: "https://image.pollinations.ai/prompt/Farm%20Fresh%20Avocado?width=400&height=300&nologo=true" }
                ];
                
                const stmt = db.prepare('INSERT INTO products (title, category, price, unit, image) VALUES (?, ?, ?, ?, ?)');
                products.forEach(p => {
                    stmt.run(p.title, p.category, p.price, p.unit, p.image);
                });
                stmt.finalize();
                console.log('Seeded products table.');
            }
        });
    });
}

module.exports = db;
