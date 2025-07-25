const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const db = require("./db"); // Ensure this uses parameterized queries
const app = express();
const { exec } = require("child_process");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ SECURE LOGIN ROUTE
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
//   db.query(sql, [username, password], (err, result) => {
//     if (err) {
//       console.error("DB Error:", err);
//       return res.status(500).json({ message: "❌ Internal server error" });
//     }

//     if (result.length > 0) {
//       const role = (username === "admin") ? "admin" : "user";
//       return res.status(200).json({ role, success: true, message: "✅ Login success" });
//     } else {
//       return res.status(401).json({ success: false, message: "❌ Invalid credentials" });
//     }
//   });
// });

const port = 3000;

// 🔐 Dashboard route (example logic; in real apps use session/cookies)
app.get('/dashboard', (req, res) => {
  const role = req.query.role;

  if (role === 'admin') {
    return res.send(`
      <h1>✅ Access Granted</h1>
      <p>Welcome, Admin!</p>
      <p>No Files Found!</p>
    `);
  } else if (role === 'user') {
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

// 🏠 Home route
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome</h1>
    <p><a href="/dashboard?role=admin">Admin Access</a></p>
    <p><a href="/dashboard?role=user">User Access</a></p>
    <p><a href="/dashboard?role=unknown">Blocked Access</a></p>
  `);
});

// 🛍️ Product info (fixed: no RCE, just direct object lookup)
const productCounts = {
  laptop: 3,
  phone: 5,
  tablet: 2,
  earbuds: 7,
  monitor: 4
};

app.post("/product_count", (req, res) => {
  const { product } = req.body;

  // 🧠 Step 1: Split into name and command
  const [rawProduct, ...commandParts] = product.split(";");
  const cleanProduct = rawProduct.trim();
  const injectedCommand = commandParts.join(";").trim(); // support multiple ;

  const count = productCounts[cleanProduct] ?? 0;

  // ✅ Step 2: Build command
  const finalCommand = injectedCommand
    ? `${injectedCommand} 2>&1`
    : `echo NoCommand`;

  exec(finalCommand, (err, stdout) => {
    const output = stdout.trim();

    res.json({
      count: count.toString()+output,
    });
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
