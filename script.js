let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
window.onload = renderTasks;

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") {
    alert("Please enter a task!");
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Render tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <input type="checkbox" class="form-check-input me-2"
          ${task.completed ? "checked" : ""}
          onclick="toggleTask(${task.id})">
        <span style="${task.completed ? 'text-decoration:line-through; opacity:0.6;' : ''}">
          ${task.text}
        </span>
      </div>
      <div>
        <i class="bi bi-pencil-square text-warning me-2"
           onclick="editTask(${task.id})"></i>
        <i class="bi bi-trash text-danger"
           onclick="deleteTask(${task.id})"></i>
      </div>
    `;

    list.appendChild(li);
  });
}

// Toggle completed
function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

// Edit task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt("Edit task:", task.text);

  if (newText && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task on Enter key
document.getElementById("taskInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});
