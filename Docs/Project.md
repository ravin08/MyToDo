# Project Master File – MyToDo App

## 1. Overview
- Name: MyToDo
- Description: A simple To-Do list app
- Tech Stack: Node.js, SQLite, HTML/CSS/JS

## 2. Features
- [ ] Add a task
- [ ] View all tasks
- [ ] Delete a task

## 3. Database Schema
tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)

## 4. API Endpoints
- GET /tasks → list tasks
- POST /tasks → add task
- DELETE /tasks/:id → delete task
