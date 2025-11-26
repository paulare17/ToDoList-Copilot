// app.js
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

let tasks = [];

// Cargar tareas de localStorage
function loadTasks() {
    const stored = localStorage.getItem('tasks');
    tasks = stored ? JSON.parse(stored) : [];
}

// Guardar tareas en localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Renderizar tareas
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, idx) => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = task.text;

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        // Botón completar
        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Desmarcar' : 'Completar';
        completeBtn.className = 'complete';
        completeBtn.onclick = () => {
            tasks[idx].completed = !tasks[idx].completed;
            saveTasks();
            renderTasks();
        };
        actions.appendChild(completeBtn);

        // Botón editar
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.className = 'edit';
        editBtn.onclick = () => editTask(idx);
        actions.appendChild(editBtn);

        // Botón eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'delete';
        deleteBtn.onclick = () => {
            tasks.splice(idx, 1);
            saveTasks();
            renderTasks();
        };
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}

// Añadir tarea
taskForm.onsubmit = function(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
};

// Editar tarea
function editTask(idx) {
    const newText = prompt('Edita la tarea:', tasks[idx].text);
    if (newText !== null) {
        tasks[idx].text = newText.trim() || tasks[idx].text;
        saveTasks();
        renderTasks();
    }
}

// Inicializar
loadTasks();
renderTasks();
