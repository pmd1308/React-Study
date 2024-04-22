import React, { useState } from 'React';
import './App.css';

function App() {
  // Estado de armazenamento para listar tarefas
  const [tasks, setTasks] = useState([]);
  // Estado de armazenamento para tarefa atual sendo digitada
  const [currentTask, setCurrentTask] = useState('');

  // Função para adicionar nova tarefa
  const addTask = (event) => {
    event.preventDefault(); // Impede o comportamento padrão do formulário
    if (currentTask.trim() !== '') {
      setTasks([...tasks, currentTask]); // Adiciona nova tarefa no array
      setCurrentTask(''); // Limpa o input
    }
  };

  // Função para remover tarefa
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
      </header>
      <form className="App-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Digite a tarefa"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      <ul className="App-list">
        {tasks.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => removeTask(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
