# 🛡️ Vulnerable Web App - Project Requirements

> Track the development and testing phases of your intentionally vulnerable app (for educational or bug bounty practice).

---

## 🔐 Authentication Module
- [x] Login Page (vulnerable to SQL Injection)
- [ ] Sign Up Page (optional)
- [ ] Session Management (basic)

## 💉 Vulnerabilities to Include
- [x] SQL Injection (login bypass)
- [x] Insecure Direct Object Reference (IDOR)
- [ ] Cross-Site Scripting (XSS)
- [ ] Command Injection
- [ ] Broken Authentication
- [ ] CSRF (Cross-Site Request Forgery)

## 🗃️ Database
- [x] MySQL setup
- [x] Users table with dummy data
- [ ] Admin user account

## 🧪 Testing
- [x] Manual SQLi test
- [ ] Manual IDOR test
- [ ] Burp Suite scanning
- [ ] Nikto / Nmap basic scan

## 🌐 Frontend (HTML/CSS/JS)
- [x] Login page UI
- [x] Vulnerable form inputs
- [ ] Admin dashboard (basic)
- [ ] File upload (vulnerable)

## ⚙️ Backend (Node.js + Express)
- [x] Setup Express server
- [x] SQLi-vulnerable query
- [ ] Add IDOR endpoints
- [ ] Enable CORS (for CSRF test)

## 📁 File Structure
- [x] `/frontend/index.html`
- [x] `/backend/server.js`
- [x] `.env` for DB config
- [ ] `/uploads` directory (optional)

## 🚀 Deployment & Git
- [x] Initialize Git repo
- [x] Push to GitHub
- [ ] Add README with project goals
- [ ] Deploy locally with Node.js
- [ ] Deploy on public server (optional)

---

> 🔔 NOTE: This project is for educational and ethical hacking practice only. Do not deploy publicly without securing it properly.
