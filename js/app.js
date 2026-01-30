// DOM Elements
const noteForm = document.getElementById('note-form');
const noteInput = document.getElementById('note-input');
const notesContainer = document.getElementById('notes-container');
const deleteAllBtn = document.getElementById('delete-all');
const searchInput = document.getElementById('search-input');
const themeToggle = document.getElementById('theme-toggle');

// Load notes from LocalStorage
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Load theme from LocalStorage
let darkTheme = localStorage.getItem('darkTheme') === 'true';

// Save notes
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Apply theme
function applyTheme() {
    if (darkTheme) {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = 'Modo Claro';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.textContent = 'Modo Oscuro';
    }
}
applyTheme();

// Toggle theme
themeToggle.addEventListener('click', () => {
    darkTheme = !darkTheme;
    localStorage.setItem('darkTheme', darkTheme);
    applyTheme();
});

// Render notes
function renderNotes(filter = '') {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        if (note.toLowerCase().includes(filter)) {
            const noteDiv = document.createElement('div');
            noteDiv.className = 'note col-12';
            noteDiv.innerHTML = `
                <span>${note}</span>
                <div>
                    <button class="edit" onclick="editNote(${index})">Editar</button>
                    <button class="delete" onclick="deleteNote(${index})">Eliminar</button>
                </div>
            `;
            notesContainer.appendChild(noteDiv);
        }
    });
}

// Add note
noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const noteText = noteInput.value.trim();
    if (noteText) {
        notes.push(noteText);
        saveNotes();
        renderNotes();
        noteInput.value = '';
        noteInput.focus();
    }
});

// Edit note
function editNote(index) {
    const newNote = prompt("Edita tu nota:", notes[index]);
    if (newNote !== null) {
        const trimmedNote = newNote.trim();
        if (trimmedNote) {
            notes[index] = trimmedNote;
            saveNotes();
            renderNotes();
        } else {
            alert("La nota no puede estar vacía.");
        }
    }
}

// Delete note
function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

// Delete all notes
deleteAllBtn.addEventListener('click', () => {
    if (notes.length === 0) return alert("No hay notas para eliminar.");
    if (confirm("¿Estás seguro que quieres eliminar todas las notas?")) {
        notes = [];
        saveNotes();
        renderNotes();
    }
});

// Search notes
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    renderNotes(query);
});

// Initial render
renderNotes();
