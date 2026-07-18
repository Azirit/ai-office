import { useState } from 'react';
import type { Todo } from '../types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

  const resetEditingState = () => {
    setEditingId(null);
    setEditingText('');
  };

  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (trimmed === '') return;
    setTodos([...todos, { id: crypto.randomUUID(), title: trimmed }]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingText(currentTitle);
  };

  const saveEdit = (id: string) => {
    const trimmed = editingText.trim();
    if (trimmed === '') {
      resetEditingState();
      return;
    }
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: trimmed } : todo)));
    resetEditingState();
  };

  const cancelEdit = () => {
    resetEditingState();
  };

  const handleEditingTextChange = (text: string) => {
    setEditingText(text);
  };

  return {
    todos,
    editingId,
    editingText,
    handleEditingTextChange,
    addTodo,
    deleteTodo,
    startEdit,
    saveEdit,
    cancelEdit,
  };
}
