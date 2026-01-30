// ===============================
// SmartBoard - storage.js
// Paso 4: datos + persistencia
// ===============================

const STORAGE_KEY = "smartboard-tasks";

// -------------------------------
// Obtener todas las tareas
// -------------------------------
export function getTasks() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// -------------------------------
// Guardar todas las tareas
// -------------------------------
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// -------------------------------
// Agregar tarea
// -------------------------------
export function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
}

// -------------------------------
// Eliminar tarea
// -------------------------------
export function deleteTask(taskId) {
  const tasks = getTasks().filter(task => task.id !== taskId);
  saveTasks(tasks);
}

// -------------------------------
// Mover tarea (cambiar estado)
// -------------------------------
export function moveTask(taskId, newStatus) {
  const tasks = getTasks();

  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  task.status = newStatus;
  saveTasks(tasks);
}
