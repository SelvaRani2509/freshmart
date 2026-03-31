const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(cors());
app.use(bodyParser.json());

// 1. USERS
app.get('/api/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

// 2. CATEGORIES
app.get('/api/categories', (req, res) => {
    const sql = "SELECT * FROM categories";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

// 3. PRODUCTS
app.get('/api/products', (req, res) => {
    const sql = "SELECT * FROM products";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

app.get('/api/products/:id', (req, res) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    db.get(sql, req.params.id, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(row);
    });
});

app.post('/api/products', (req, res) => {
    const { id, name, category, price, rating, description, image } = req.body;
    const sql = "INSERT INTO products (id, name, category, price, rating, description, image) VALUES (?,?,?,?,?,?,?)";
    const params = [id, name, category, price, rating, description, image];
    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": req.body
        });
    });
});

// 4. ORDERS
app.get('/api/orders', (req, res) => {
    const sql = "SELECT * FROM orders";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        const orders = rows.map(order => ({
            ...order,
            items: JSON.parse(order.items || '[]')
        }));
        res.json(orders);
    });
});

app.post('/api/orders', (req, res) => {
    const { id, customerName, phone, address, items, total, status, placedAt } = req.body;
    const orderId = id || Math.random().toString(36).substr(2, 9);
    const sql = "INSERT INTO orders (id, customerName, phone, address, items, total, status, placedAt) VALUES (?,?,?,?,?,?,?,?)";
    const params = [orderId, customerName, phone, address, JSON.stringify(items), total, status, placedAt];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { ...req.body, id: orderId }
        });
    });
});

// Serve frontend build static files
app.use(express.static(path.join(__dirname, '../build')));

// Catch-all route to serve the React app (Express 5 syntax)
app.get('/*', (req, res) => {
    // If the request is for an API route that wasn't matched above, return 404
    if (req.url.startsWith('/api')) {
        return res.status(404).json({ error: 'Not Found' });
    }
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
