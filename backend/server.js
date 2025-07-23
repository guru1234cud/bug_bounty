const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🚨 VULNERABLE LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 🧨 Vulnerable SQL query (directly injecting user input)
  const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "❌ Internal server error" });
    }

    // ✅ Admin shortcut for demo (IDOR-style role bypass)
    if (username === 'admin' && password === 'admin123') {
      return res.status(200).json({ role: "admin", success: true, message: "✅ Admin login" });
    }

    if (result.length > 0) {
      return res.status(200).json({ role: "user", success: true, message: "✅ Login success" });
    } else {
      return res.status(401).json({ success: false, message: "❌ Invalid credentials" });
    }
  });
});

const port = process.env.PORT;

// Dashboard route

app.get('/dashboard', (req, res) => {
  const admin = req.query.admin;
  const user = req.query.user;

  if (admin === '1') {
    return res.send(`
      <h1>✅ Access Granted</h1>
      <p>Welcome, Admin!</p>
      <p>No Files Found!</p>
    `);
  } else if (user === '1') {
    return res.send(`
      <h1>✅ Access Granted</h1>
      <p>Welcome, User!</p>
      <a href="https://docs.google.com/forms/d/e/1FAIpQLSf5YAW6IbHpsd-XHbOI-3uxU6nPhegzikC7Fx22dC4kUqAYkQ/viewform?usp=header" target="_blank">
  📝 Fill out the Google Form
</a>

    `);
  } else {
    return res.send(`
      <h1>❌ Access Denied</h1>
      <p>You are not authorized to view this page.</p>
    `);
  }
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome</h1>
    <p><a href="/dashboard?admin=0">Go to Dashboard (Blocked)</a></p>
    <p><a href="/dashboard?admin=1">Admin Access</a></p>
    <p><a href="/dashboard?user=1">User Access</a></p>
  `);
});


app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
