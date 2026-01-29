// ===============================
// SmartBoard - app.js FINAL (FIX)
// ===============================

import {
  getTasks,
  addTask,
  deleteTask,
  moveTask
} from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // DOM
  // ===============================
  const todoList = document.getElementById("todoList");
  const progressList = document.getElementById("progressList");
  const doneList = document.getElementById("doneList");

  if (!todoList || !progressList || !doneList) {
    console.error("Listas no encontradas en el DOM");
    return;
  }

  // ===============================
  // RENDER
  // ===============================
  function renderBoard() {
    clearLists();

    const tasks = getTasks();

    if (tasks.length === 0) {
      showEmpty(todoList);
      showEmpty(progressList);
      showEmpty(doneList);
      return;
    }

    tasks.forEach(task => {
      const taskElement = createTaskElement(task);

      if (task.status === "todo") todoList.appendChild(taskElement);
      if (task.status === "progress") progressList.appendChild(taskElement);
      if (task.status === "done") doneList.appendChild(taskElement);
    });
  }

  function clearLists() {
    todoList.innerHTML = "";
    progressList.innerHTML = "";
    doneList.innerHTML = "";
  }

  function showEmpty(list) {
    list.innerHTML = `
      <li class="list-group-item text-muted text-center">
        No hay tareas
      </li>
    `;
  }

  // ===============================
  // TASK UI
  // ===============================
  function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.draggable = true;
    li.dataset.id = task.id;

    li.innerHTML = `
      <span>${task.title}</span>
      <div class="btn-group btn-group-sm">
        <button class="btn btn-outline-success">✔</button>
        <button class="btn btn-outline-danger">✖</button>
      </div>
    `;

    li.querySelector(".btn-outline-danger").onclick = () => {
      deleteTask(task.id);
      renderBoard();
    };

    li.querySelector(".btn-outline-success").onclick = () => {
      moveTask(task.id, "done");
      renderBoard();
    };

    li.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", task.id);
    });

    return li;
  }

  // ===============================
  // DRAG & DROP
  // ===============================
  [todoList, progressList, doneList].forEach(list => {
    list.addEventListener("dragover", e => e.preventDefault());

    list.addEventListener("drop", e => {
      e.preventDefault();
      const taskId = e.dataTransfer.getData("text/plain");

      const status =
        list.id === "todoList"
          ? "todo"
          : list.id === "progressList"
          ? "progress"
          : "done";

      moveTask(taskId, status);
      renderBoard();
    });
  });

  // ===============================
  // DEMO TASK
  // ===============================
  if (getTasks().length === 0) {
    addTask({
      id: crypto.randomUUID(),
      title: "Ejemplo de tarea",
      status: "todo",
      createdAt: new Date().toISOString()
    });
  }

  renderBoard();
});
