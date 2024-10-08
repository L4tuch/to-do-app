const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskTable = document.getElementById('task-table');

// Funkcja do pobierania zadań z serwera i wyświetlania ich w tabeli
async function fetchTasks() {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();

    taskTable.innerHTML = '';  // Czyścimy tabelę przed renderowaniem

    tasks.forEach(task => {
        const row = document.createElement('tr');
        row.classList.toggle('completed', task.completed);  // Dodaj klasę, jeśli zadanie jest zrobione

        const taskCell = document.createElement('td');
        taskCell.textContent = task.task;

        const statusCell = document.createElement('td');
        statusCell.textContent = task.completed ? 'Completed' : 'Not Completed';

        const dateCell = document.createElement('td');
        dateCell.textContent = task.completionDate || '-';

        const actionCell = document.createElement('td');
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = task.completed ? 'Undo' : 'Complete';
        toggleBtn.addEventListener('click', async () => {
            await fetch(`/api/tasks/${task.task}`, { method: 'PUT' });
            fetchTasks();  // Odśwież tabelę
        });
        actionCell.appendChild(toggleBtn);

        row.appendChild(taskCell);
        row.appendChild(statusCell);
        row.appendChild(dateCell);
        row.appendChild(actionCell);
        taskTable.appendChild(row);
    });
}

// Obsługa dodawania nowego zadania
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskValue = taskInput.value;

    if (taskValue) {
        // Wyślij zapytanie POST do serwera
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: taskValue })
        });

        taskInput.value = '';  // Wyczyść pole input
        fetchTasks();  // Odśwież listę zadań
    }
});

// Pobierz zadania na start
fetchTasks();
