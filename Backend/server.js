// MyToDo App - Backend
// Node.js + Express + SQLite

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database("./tasks.db", (err) => {
  if (err) console.error("DB error: " + err.message);
  else console.log("Connected to SQLite database.");
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Routes

// 1. Get all tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks ORDER BY created_at DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 2. Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  db.run("INSERT INTO tasks (title) VALUES (?)", [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, title });
  });
});

// 3. Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
