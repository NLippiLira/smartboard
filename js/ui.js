export function renderNotes(notes) {
  const notesList = document.getElementById('notesList');
  notesList.innerHTML = '';

  if (notes.length === 0) {
    notesList.innerHTML = `
      <p class="text-muted text-center">
        No hay notas todavía
      </p>
    `;
    return;
  }

  notes.forEach(note => {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    col.innerHTML = `
      <div class="card card-note h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <h6 class="note-title">${note.title}</h6>
          <p class="flex-grow-1">${note.content}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="note-date">${note.date}</span>
            <button
              class="btn btn-sm btn-danger btn-delete"
              data-id="${note.id}"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    `;

    notesList.appendChild(col);
  });
}

export function clearForm() {
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteContent').value = '';
}
