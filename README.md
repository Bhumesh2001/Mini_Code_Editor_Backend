# 🧠 Online Code Compiler (Backend)

This is the backend server for the **Online Code Compiler** application. It uses **Node.js**, **Express**, and **WebSockets** to execute code in real-time and support interactive terminal input/output.

## 🔧 Features

- 🌐 WebSocket-based communication
- 🐍 Python & 💻 JavaScript code execution support
- 💬 Interactive input during code execution (e.g., Python's `input()`)
- ⏳ Streams live stdout & stderr back to the frontend
- 🧼 Secure process handling with auto-cleanup

---

## 🚀 Tech Stack

- **Node.js**
- **Express**
- **ws** (WebSocket server)
- **child_process** (for code execution)
- **fs** (for saving temp files)

---

## 📁 Project Structure

backend/
├── server.js # Main server file
├── package.json
└── README.md

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/online-code-compiler-backend.git
cd online-code-compiler-backend

2. Install dependencies
npm install

3. Run the server
npm run dev || npm start

🔄 WebSocket API
Connection
URL: ws://localhost:5000

Protocol: WebSocket

👨‍💻 Author
Developed by Bhumesh Kewat
📧 bhumesh21@navgurukul.org
📞 8080368624
🌐 https://www.linkedin.com/in/bhumesh-kewat-backend-developer/