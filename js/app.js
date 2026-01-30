// ===============================
// SmartBoard - app.js
// Paso 6: orquestador
// ===============================

import {
  getTasks,
  addTask,
  deleteTask,
  moveTask
} from "./storage.js";

import {
  renderBoard
} from "./ui.js";

// -------------------------------
// INIT
// -------------------------------
document.addEventListener("DOMContentLoaded", init);

function init() {
  // Demo task si no hay nada
  if (getTasks().length === 0) {
    addTask({
      id: crypto.randomUUID(),
      title: "Ejemplo de tarea",
      status: "todo",
      createdAt: new Date().toISOString()
    });
  }

  render();
}

// -------------------------------
// Render
// -------------------------------
function render() {
  const tasks = getTasks();
  renderBoard(tasks);
}

// -------------------------------
// EVENTOS BÁSICOS
// -------------------------------
document.addEventListener("click", e => {
  const action = e.target.dataset.action;
  if (!action) return;

  const taskElement = e.target.closest("li");
  if (!taskElement) return;

  const taskId = taskElement.dataset.id;

  if (action === "delete") {
    deleteTask(taskId);
  }

  if (action === "done") {
    moveTask(taskId, "done");
  }

  render();
});
