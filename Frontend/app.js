const API_URL = "http://localhost:3000/tasks";

// Fetch and show tasks
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = ""; // clear old items

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;

    // Add delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add a task
async function addTask() {
  const taskInput = document.getElementById("taskInput");
  const title = taskInput.value.trim();

  if (title !== "") {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });

    taskInput.value = "";
    fetchTasks(); // refresh
  }
}

// Delete a task
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchTasks();
}

// Load tasks on page load
window.onload = fetchTasks;
