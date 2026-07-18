import { useState } from 'react';
import { useTodos } from './hooks';

function App() {
  const {
    todos,
    editingId,
    editingText,
    handleEditingTextChange,
    addTodo,
    deleteTodo,
    startEdit,
    saveEdit,
    cancelEdit,
  } = useTodos();

  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    addTodo(newTodoText);
    setNewTodoText('');
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
                  onChange={(event) => handleEditingTextChange(event.target.value)}
                  aria-label="Редактирование задачи"
                />
                <button onClick={() => saveEdit(todo.id)}>
                  Сохранить
                </button>
                <button onClick={cancelEdit}>
                  Отмена
                </button>
              </>
            ) : (
              <>
                {todo.title}
                <button onClick={() => startEdit(todo.id, todo.title)}>
                  Редактировать
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
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
