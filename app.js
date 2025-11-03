const { load } = require("mime");

const taskList = document.getElementById("todo-list");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");

// 🧠 Load danh sách ban đầu
async function loadTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  taskList.innerHTML = "";
}

// 🎨 Thêm task vào giao diện
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.className =
    "flex justify-between items-center py-2 border-b break-words max-w-full";
  li.innerHTML = `
    <span class="${
      task.completed ? "line-through text-gray-400" : ""
    } flex-1 mr-4">${task.text}</span>
    <div class="flex gap-2">
      <button class="mark-btn bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">${
        task.completed ? "Unmark" : "Mark"
      }</button>
      <button class="remove-btn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Remove</button>
    </div>
  `;
  li.querySelector(".mark-btn").onclick = () => toggleTask(task.id);
  li.querySelector(".remove-btn").onclick = () => deleteTask(task.id);
  taskList.appendChild(li);
  loadTasks();
}

// ➕ Gửi API thêm task
addBtn.addEventListener("click", async () => {
  const text = taskInput.value.trim();
  if (!text) return;
  const res = await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const newTask = await res.json();
  addTaskToDOM(newTask);
  taskInput.value = "";
  loadTasks();
});

// 🔄 Gửi API toggle completed
async function toggleTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "PUT" });
  loadTasks(); // load lại toàn bộ -> sẽ tự kiểm tra empty
}

// ❌ Gửi API xoá
async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  loadTasks(); // load lại -> nếu hết task sẽ hiển thị empty
}

loadTasks();
