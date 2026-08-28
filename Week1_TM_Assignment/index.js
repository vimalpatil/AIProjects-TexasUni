// ==============================
// Task Manager - Interactive Application
// ==============================
// This file combines both the core functions (which you need to implement)
// and the application setup code (which is provided).
//
// LEARNER REFERENCE - TODO FUNCTIONS TO IMPLEMENT:
// -------------------------------------------------
// Line 28:  showStatus()              - Display status messages using alert
// Line 33:  escapeHtml()              - Escape HTML to prevent XSS attacks
// Line 42:  addTask()                 - Add new task with validation
// Line 48:  completeTask()            - Mark task as completed
// Line 53:  deleteTask()              - Delete task from all data structures
// Line 58:  saveTasksToStorage()      - Save tasks to localStorage
// Line 63:  loadTasksFromStorage()    - Load tasks from localStorage
// Line 68:  clearAll()                - Clear all tasks and localStorage
//
// Lines 73+: Application Setup (PROVIDED - DO NOT MODIFY)
//            - DOM elements, UI functions, event listeners, initialization
//
// ==============================
// Data Structures
// ==============================
// Global variable example
const appName = "Interactive Task Manager";

// Data structures to store tasks
let tasks = []; // Array to store all task objects
let taskId = 1; // Counter to generate unique IDs for each new task
const taskMap = new Map(); // For quick lookup of tasks by ID
const taskTitles = new Set(); // To ensure unique titles

// ==============================
// Utility Functions
// ==============================

// Shows a status message to the user
function showStatus(message, type = "success") {
  // TODO: Show an alert
}

// Escapes HTML special characters to prevent XSS attacks
function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });
}

// ==============================
// Task Management Functions
// ==============================

// Adds a new task to the task list
function addTask(
  e,
  taskInput,
  addTaskError,
  renderCallback,
  updateCountCallback,
) {
  e.preventDefault();

  addTaskError.textContent = "";
  addTaskError.style.display = "none";

  const title = taskInput.value.trim();
  if (!title) {
    addTaskError.textContent = "Task title cannot be empty.";
    addTaskError.style.display = "block";
    return;
  }
  if (taskTitles.has(title)) {
    addTaskError.textContent = "Task title must be unique.";
    addTaskError.style.display = "block";
    return;
  }

  const newTask = {
    id: taskId++,
    title: title,
    status: "pending",
  };

  tasks.push(newTask);
  taskMap.set(newTask.id, newTask);
  taskTitles.add(title);
  taskInput.value = "";
  renderCallback();
  updateCountCallback();
}

// Marks a task as completed
function completeTask(id, renderCallback) {
  //TODO: Mark task as completed in all data structures 
  const task = taskMap.get(id);
  if (task) {
    task.status = "completed";
    renderCallback();
  }   
}

// Deletes a task from the task list
function deleteTask(id, renderCallback, updateCountCallback) {
  //TODO: Delete task from all data structures
  const task = taskMap.get(id);
  if (task) {
    tasks = tasks.filter((t) => t.id !== id);
    taskMap.delete(id);
    taskTitles.delete(task.title);
    renderCallback();
    updateCountCallback();
  }   
}

// Saves all tasks to browser's localStorage
function saveTasksToStorage() {
  // TODO: Save tasks to localStorage 
  localStorage.setItem("tasks", JSON.stringify(tasks));   

}

// Loads tasks from browser's localStorage
function loadTasksFromStorage(renderCallback, updateCountCallback) {
  // TODO: Load tasks from localStorage
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    taskMap.clear();
    taskTitles.clear();
    tasks.forEach((task) => {
      taskMap.set(task.id, task);
      taskTitles.add(task.title);
    });
    renderCallback();
    updateCountCallback();
  }   
}

// Clears all tasks from memory AND localStorage
function clearAll(renderCallback, updateCountCallback) {
  // TODO: Clear all tasks and localStorage
  tasks = [];
  taskMap.clear();
  taskTitles.clear();
  localStorage.removeItem("tasks");
  renderCallback();
  updateCountCallback();      
  
}

// ==============================
// Task Manager - Application Setup
// ==============================
// This file contains the boilerplate code for DOM manipulation,
// event listeners, and application initialization.

// ==============================
// DOM Elements
// ==============================
const taskInput = document.getElementById("taskInput");
const addTaskForm = document.getElementById("addTaskForm");
const addTaskError = document.getElementById("addTaskError");
const tasksList = document.getElementById("tasksList");
const taskCount = document.getElementById("taskCount");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");

// ==============================
// UI Update Functions
// ==============================

// Updates the task count display
function updateTaskCount() {
  const count = tasks.length;
  taskCount.textContent = `${count} task${count !== 1 ? "s" : ""}`;
}

// Renders the task list in the UI
function renderTasks(tasksToRender = tasks) {
  // Show empty state if no tasks
  if (tasksToRender.length === 0) {
    tasksList.innerHTML = `
      <div class="empty-state">
        <i class="bi bi-inbox"></i>
        <p>No tasks available. Add your first task above!</p>
      </div>
    `;
    return;
  }

  // Render task items
  tasksList.innerHTML = tasksToRender
    .map(
      (task) => `
    <div class="task-item ${task.status}" data-id="${task.id}">
      <div class="d-flex justify-content-between align-items-center">
        <div class="flex-grow-1">
          <div class="d-flex align-items-center gap-2 mb-1">
            <span class="task-id">#${task.id}</span>
            <span class="task-status status-${task.status}">${task.status}</span>
          </div>
          <p class="task-title">${escapeHtml(task.title)}</p>
        </div>
        <div class="d-flex gap-2">
          ${
            task.status === "pending"
              ? `<button class="btn btn-success btn-sm complete-btn" data-id="${task.id}">
              <i class="bi bi-check-lg"></i> Complete
            </button>`
              : ""
          }
          <button class="btn btn-danger btn-sm delete-btn" data-id="${task.id}">
            <i class="bi bi-trash"></i> Delete
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  // Attach event listeners to task buttons
  attachTaskEventListeners();
}

// Attaches event listeners to dynamically created task buttons
function attachTaskEventListeners() {
  // Complete buttons
  document.querySelectorAll(".complete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      completeTask(id, renderTasks);
    });
  });

  // Delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      deleteTask(id, renderTasks, updateTaskCount);
    });
  });
}

// ==============================
// Event Listeners
// ==============================

// Add task form submission
addTaskForm.addEventListener("submit", (e) => {
  addTask(e, taskInput, addTaskError, renderTasks, updateTaskCount);
});

// Save tasks to localStorage
saveBtn.addEventListener("click", () => {
  saveTasksToStorage();
});

// Load tasks from localStorage
loadBtn.addEventListener("click", () => {
  loadTasksFromStorage(renderTasks, updateTaskCount);
});

// Clear all tasks and localStorage
clearBtn.addEventListener("click", () => {
  clearAll(renderTasks, updateTaskCount);
});

// ==============================
// Initialize Application
// ==============================

// Initializes the application
function initApp() {
  // Start with empty state - don't auto-load from localStorage
  renderTasks();
  updateTaskCount();

  console.log(`${appName} initialized successfully!`);
}

// Start the application when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
