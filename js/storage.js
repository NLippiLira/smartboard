// ===============================
// SmartBoard - storage.js
// Persistencia y estado global
// ===============================

const STORAGE_KEY = "smartboard-tasks";

// Estado base
let tasks = loadTasks();

// ===============================
// LocalStorage
// ===============================
function loadTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// ===============================
// CRUD
// ===============================
export function getTasks() {
  return tasks;
}

export function addTask(task) {
  tasks.push(task);
  saveTasks();
}

export function updateTask(updatedTask) {
  tasks = tasks.map(task =>
    task.id === updatedTask.id ? updatedTask : task
  );
  saveTasks();
}

export function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
}

export function moveTask(taskId, newStatus) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, status: newStatus } : task
  );
  saveTasks();
}
