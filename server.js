const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 4000;
const DATA_FILE = path.join(__dirname, "tasks.json");
const MEMBERS_FILE = path.join(__dirname, "members.json");

// Cấu hình view engine là EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "todo-csr")));

// 🧠 Lấy danh sách task
app.get("/api/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.json(tasks);
  console.log("Sent tasks:");
});

//Lấy danh sách thành viên
app.get("/api/members", (req, res) => {
  const members = JSON.parse(fs.readFileSync(MEMBERS_FILE, "utf8"));
  res.json(members);
  console.log("Sent members:");
});

// ➕ Thêm task
app.post("/api/tasks", (req, res) => {
  console.log("Received JSON:", req.body);
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const newTask = { id: Date.now(), text: req.body.text, completed: false };
  tasks.push(newTask);
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.status(201).json(newTask);
});

// 🔄 Toggle mark
app.put("/api/tasks/:id", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) return res.status(404).json({ message: "Not found" });
  task.completed = !task.completed;
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.json(task);
});

// ❌ Xoá task
app.delete("/api/tasks/:id", (req, res) => {
  let tasks = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
  res.status(204).end();
});

// 🔹 Trang Home (EJS render)
app.get("/", (req, res) => {
  const members = JSON.parse(fs.readFileSync(MEMBERS_FILE, "utf8"));
  res.render("home", { title: "Trang chủ ToDo List", members });
});

// 🔹 Trang ToDo (render danh sách)
app.get("/todo", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.render("todo", { title: "Danh sách công việc", tasks });
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
