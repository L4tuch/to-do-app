const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));  // Serwuj pliki statyczne z folderu public
app.use(express.json()); // Parser JSON

// Lista zadań
let tasks = [];

// Pobierz wszystkie zadania
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Dodaj nowe zadanie
app.post('/api/tasks', (req, res) => {
    const newTask = {
        task: req.body.task,
        completed: false,  // Domyślnie nowe zadanie jest niezrobione
        completionDate: null  // Data ukończenia na początku null
    };

    console.log('New task received:', newTask);  // Dodaj tę linię
    tasks.push(newTask);
    res.json({ message: 'Task added!', task: newTask });
});

// Zaktualizuj status zadania (zrobione/niezrobione)
app.put('/api/tasks/:task', (req, res) => {
    const taskName = req.params.task;
    tasks = tasks.map(task => {
        if (task.task === taskName) {
            return {
                ...task,
                completed: !task.completed,  // Zmiana statusu
                completionDate: task.completed ? null : new Date().toLocaleString()  // Data ukończenia
            };
        }
        return task;
    });
    res.json({ message: 'Task status updated!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
