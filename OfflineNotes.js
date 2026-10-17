const titleInput = document.getElementById("noteTitle");
const bodyInput = document.getElementById("noteBody");
const addButton = document.getElementById("addNoteButton");
const clearButton = document.getElementById("clearButton");
const notesList = document.getElementById("notesList");
const emptyState = document.getElementById("emptyState");
const noteCount = document.getElementById("noteCount");
const formMessage = document.getElementById("formMessage");
const connectionStatus = document.getElementById("connectionStatus");
const statusDot = document.getElementById("statusDot");

const STORAGE_KEY = "offline-notes-items";
let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Could not load saved notes:", error);
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[character]);
}

function renderNotes() {
  notesList.innerHTML = "";
  noteCount.textContent = notes.length;
  emptyState.hidden = notes.length > 0;

  notes.forEach(note => {
    const article = document.createElement("article");
    article.className = "note-card";
    article.innerHTML = `
      <h3>${escapeHTML(note.title)}</h3>
      <p>${escapeHTML(note.body)}</p>
      <div class="note-meta">
        <span>${escapeHTML(note.date)}</span>
        <button class="delete-note" type="button" data-id="${escapeHTML(note.id)}" aria-label="Delete note">Delete ×</button>
      </div>`;
    notesList.appendChild(article);
  });
}

function addNote() {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title || !body) {
    formMessage.textContent = "Please enter both a title and a note.";
    formMessage.style.color = "#d04444";
    return;
  }

  notes.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    body,
    date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
  });

  saveNotes();
  renderNotes();
  titleInput.value = "";
  bodyInput.value = "";
  formMessage.style.color = "var(--green)";
  formMessage.textContent = "Note saved on this device.";
  titleInput.focus();
}

addButton.addEventListener("click", addNote);
bodyInput.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key === "Enter") addNote();
});

notesList.addEventListener("click", event => {
  const button = event.target.closest(".delete-note");
  if (!button) return;
  notes = notes.filter(note => note.id !== button.dataset.id);
  saveNotes();
  renderNotes();
});

clearButton.addEventListener("click", () => {
  if (!notes.length) {
    formMessage.textContent = "There are no notes to clear.";
    return;
  }
  if (confirm("Delete all notes saved on this device?")) {
    notes = [];
    saveNotes();
    renderNotes();
    formMessage.textContent = "All notes cleared.";
  }
});

function updateConnectionStatus() {
  const online = navigator.onLine;
  connectionStatus.textContent = online ? "Online" : "Offline mode";
  statusDot.className = `status-dot ${online ? "online" : "offline"}`;
}
window.addEventListener("online", updateConnectionStatus);
window.addEventListener("offline", updateConnectionStatus);
updateConnectionStatus();
renderNotes();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
      console.log("Service worker registered successfully.");
    } catch (error) {
      console.error("Service worker registration failed:", error);
    }
  });
} else {
  console.warn("This browser does not support service workers.");
}
