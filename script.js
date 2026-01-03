let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
window.onload = renderTasks;

// Add new task
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return alert("Please enter a task!");

  tasks.push({
    id: Date.now(),
    text: taskText,
    completed: false
  });

  input.value = "";
  saveTasks();
  renderTasks();
}

// Render tasks
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""}
          onclick="toggleTask(${task.id})"
          class="form-check-input me-2">
        <span style="${task.completed ? 'text-decoration: line-through; opacity:0.6' : ''}">
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

    taskList.appendChild(li);
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

  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
