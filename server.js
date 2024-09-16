const express = require('express');
const app = express();
const PORT = 3000;

// Serwowanie plików statycznych z folderu public
app.use(express.static('public'));
app.use(express.json()); // Parser JSON

// Tablica przechowująca zadania
let tasks = [];

// Endpoint do pobierania wszystkich zadań
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Endpoint do dodawania nowego zadania
app.post('/api/tasks', (req, res) => {
    const newTask = {
        task: req.body.task,
        completed: false,
        completionDate: null
    };

    tasks.push(newTask);
    res.json({ message: 'Task added!', task: newTask });
});

// Endpoint do zmiany statusu zadania (zrobione / niezrobione)
app.put('/api/tasks/:task', (req, res) => {
    const taskName = req.params.task;
    tasks = tasks.map(task => {
        if (task.task === taskName) {
            return {
                ...task,
                completed: !task.completed,
                completionDate: task.completed ? null : new Date().toLocaleString()
            };
        }
        return task;
    });
    res.json({ message: 'Task status updated!' });
});

// Uruchomienie serwera na porcie 3000
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
