const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const DBSOURCE = path.join(__dirname, 'freshmart.db');
const JSON_SOURCE = path.join(__dirname, '../db.json');

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');
        initDatabase();
    }
});

function initDatabase() {
    // 1. Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        password TEXT,
        role TEXT,
        name TEXT
    )`, (err) => {
        if (err) console.error("Error creating users table", err);
        else seedUsers();
    });

    // 2. Categories Table
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id TEXT PRIMARY KEY,
        name TEXT
    )`, (err) => {
        if (err) console.error("Error creating categories table", err);
        else seedCategories();
    });

    // 3. Products Table
    db.run(`CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        category TEXT,
        price REAL,
        rating REAL,
        description TEXT,
        image TEXT
    )`, (err) => {
        if (err) console.error("Error creating products table", err);
        else seedProducts();
    });

    // 4. Delivery Persons Table
    db.run(`CREATE TABLE IF NOT EXISTS deliveryPersons (
        id TEXT PRIMARY KEY,
        name TEXT,
        phone TEXT
    )`, (err) => {
        if (err) console.error("Error creating deliveryPersons table", err);
        else seedDeliveryPersons();
    });

    // 5. Orders Table
    // Storing items as a JSON string for simplicity in this migration
    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        customerName TEXT,
        phone TEXT,
        address TEXT,
        items TEXT, 
        total REAL,
        status TEXT,
        placedAt TEXT
    )`, (err) => {
        if (err) console.error("Error creating orders table", err);
        else seedOrders();
    });
}

function loadJsonData() {
    try {
        const raw = fs.readFileSync(JSON_SOURCE);
        return JSON.parse(raw);
    } catch (err) {
        console.error("Could not read db.json for seeding", err);
        return null;
    }
}

function seedUsers() {
    const data = loadJsonData();
    if (!data || !data.users) return;

    const stmt = db.prepare("INSERT OR IGNORE INTO users (id, username, password, role, name) VALUES (?, ?, ?, ?, ?)");
    data.users.forEach(user => {
        stmt.run(user.id, user.username, user.password, user.role, user.name);
    });
    stmt.finalize();
}

function seedCategories() {
    const data = loadJsonData();
    if (!data || !data.categories) return;

    const stmt = db.prepare("INSERT OR IGNORE INTO categories (id, name) VALUES (?, ?)");
    data.categories.forEach(cat => {
        stmt.run(cat.id, cat.name);
    });
    stmt.finalize();
}

function seedProducts() {
    const data = loadJsonData();
    if (!data || !data.products) return;

    const stmt = db.prepare("INSERT OR IGNORE INTO products (id, name, category, price, rating, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)");
    data.products.forEach(p => {
        stmt.run(p.id, p.name, p.category, p.price, p.rating, p.description, p.image);
    });
    stmt.finalize();
}

function seedDeliveryPersons() {
    const data = loadJsonData();
    if (!data || !data.deliveryPersons) return;

    const stmt = db.prepare("INSERT OR IGNORE INTO deliveryPersons (id, name, phone) VALUES (?, ?, ?)");
    data.deliveryPersons.forEach(d => {
        stmt.run(d.id, d.name, d.phone);
    });
    stmt.finalize();
}

function seedOrders() {
    const data = loadJsonData();
    if (!data || !data.orders) return;

    const stmt = db.prepare("INSERT OR IGNORE INTO orders (id, customerName, phone, address, items, total, status, placedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    data.orders.forEach(o => {
        stmt.run(o.id, o.customerName, o.phone, o.address, JSON.stringify(o.items), o.total, o.status, o.placedAt);
    });
    stmt.finalize();
}

module.exports = db;
