import { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = () => {
    const trimmed = text.trim();
    if (trimmed === '') return;
    setTodos([...todos, trimmed]);
    setText('');
  };

  return (
    <main>
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Введите задачу"
      />

      <button onClick={handleAddTodo}>
        Добавить
      </button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;