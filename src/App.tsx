import { useState } from 'react';

function App() {
  const [newTodoText, setNewTodoText] = useState('');
  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const resetEditingState = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleAddTodo = () => {
    const trimmed = newTodoText.trim();
    if (trimmed === '') return;
    setTodos([...todos, { id: crypto.randomUUID(), title: trimmed }]);
    setNewTodoText('');
  };

  const handleDeleteTodo = (idToDelete: string) => {
    setTodos(todos.filter((todo) => todo.id !== idToDelete));
  };

  const handleEditTodo = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  const handleSaveEdit = (idToSave: string) => {
    const trimmed = editingText.trim();
    if (trimmed === '') {
      resetEditingState();
      return;
    }
    setTodos(todos.map((todo) => todo.id === idToSave ? { ...todo, title: trimmed } : todo));
    resetEditingState();
  };

  const handleCancelEdit = () => {
    resetEditingState();
  };

  return (
    <main>
      <h1>Todo App</h1>

      <input
        value={newTodoText}
        onChange={(event) => setNewTodoText(event.target.value)}
        placeholder="Введите задачу"
      />

      <button onClick={handleAddTodo}>
        Добавить
      </button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(event) => setEditingText(event.target.value)}
                  aria-label="Редактирование задачи"
                />
                <button onClick={() => handleSaveEdit(todo.id)}>
                  Сохранить
                </button>
                <button onClick={handleCancelEdit}>
                  Отмена
                </button>
              </>
            ) : (
              <>
                {todo.title}
                <button onClick={() => handleEditTodo(todo.id, todo.title)}>
                  Редактировать
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)}>
                  Удалить
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;