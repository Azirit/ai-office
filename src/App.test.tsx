import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('adds a new todo when typing and clicking "Добавить"', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const button = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Купить молоко')
    await user.click(button)

    expect(screen.getByText('Купить молоко')).toBeInTheDocument()
  })

  it('deletes one todo and the other remains', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)
    await user.type(input, 'Задача 2')
    await user.click(addBtn)

    const deleteBtns = screen.getAllByRole('button', { name: /удалить/i })
    await user.click(deleteBtns[0])

    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument()
    expect(screen.getByText('Задача 2')).toBeInTheDocument()
  })

  it('deletes the middle todo from three', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Первая')
    await user.click(addBtn)
    await user.type(input, 'Вторая')
    await user.click(addBtn)
    await user.type(input, 'Третья')
    await user.click(addBtn)

    const deleteBtns = screen.getAllByRole('button', { name: /удалить/i })
    await user.click(deleteBtns[1])

    expect(screen.getByText('Первая')).toBeInTheDocument()
    expect(screen.queryByText('Вторая')).not.toBeInTheDocument()
    expect(screen.getByText('Третья')).toBeInTheDocument()
  })

  it('adds a new todo after deletion', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача А')
    await user.click(addBtn)
    await user.type(input, 'Задача Б')
    await user.click(addBtn)

    const deleteBtns = screen.getAllByRole('button', { name: /удалить/i })
    await user.click(deleteBtns[0])

    await user.type(input, 'Задача В')
    await user.click(addBtn)

    expect(screen.queryByText('Задача А')).not.toBeInTheDocument()
    expect(screen.getByText('Задача Б')).toBeInTheDocument()
    expect(screen.getByText('Задача В')).toBeInTheDocument()
  })

  it('does not add an empty todo', async () => {
    const user = userEvent.setup()

    render(<App />)

    const addBtn = screen.getByRole('button', { name: /добавить/i })
    await user.click(addBtn)

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('does not add a todo with only whitespace', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, '   ')
    await user.click(addBtn)

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  })

  it('shows delete button for each todo', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)

    const items = screen.getAllByRole('listitem')
    expect(items).toHaveLength(1)
    expect(within(items[0]).getByRole('button', { name: /удалить/i })).toBeInTheDocument()
  })

  it('enters edit mode and shows save and cancel buttons', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)

    const editBtn = screen.getByRole('button', { name: /редактировать/i })
    await user.click(editBtn)

    expect(screen.getByRole('button', { name: /сохранить/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /отмена/i })).toBeInTheDocument()
  })

  it('edits a todo and saves the new title', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)

    const editBtn = screen.getByRole('button', { name: /редактировать/i })
    await user.click(editBtn)

    const listItem = screen.getByRole('listitem')
    const editInput = within(listItem).getByRole('textbox')
    await user.clear(editInput)
    await user.type(editInput, 'Обновлённая задача')

    const saveBtn = screen.getByRole('button', { name: /сохранить/i })
    await user.click(saveBtn)

    expect(screen.getByText('Обновлённая задача')).toBeInTheDocument()
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument()
  })

  it('cancels edit without changing the title', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)

    const editBtn = screen.getByRole('button', { name: /редактировать/i })
    await user.click(editBtn)

    const listItem = screen.getByRole('listitem')
    const editInput = within(listItem).getByRole('textbox')
    await user.clear(editInput)
    await user.type(editInput, 'Не сохранять')

    const cancelBtn = screen.getByRole('button', { name: /отмена/i })
    await user.click(cancelBtn)

    expect(screen.getByText('Задача 1')).toBeInTheDocument()
    expect(screen.queryByText('Не сохранять')).not.toBeInTheDocument()
  })

  it('does not save edit with empty text', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)

    const editBtn = screen.getByRole('button', { name: /редактировать/i })
    await user.click(editBtn)

    const listItem = screen.getByRole('listitem')
    const editInput = within(listItem).getByRole('textbox')
    await user.clear(editInput)

    const saveBtn = screen.getByRole('button', { name: /сохранить/i })
    await user.click(saveBtn)

    expect(screen.getByText('Задача 1')).toBeInTheDocument()
  })

  it('does not save edit with only whitespace', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)

    const editBtn = screen.getByRole('button', { name: /редактировать/i })
    await user.click(editBtn)

    const listItem = screen.getByRole('listitem')
    const editInput = within(listItem).getByRole('textbox')
    await user.clear(editInput)
    await user.type(editInput, '   ')

    const saveBtn = screen.getByRole('button', { name: /сохранить/i })
    await user.click(saveBtn)

    expect(screen.getByText('Задача 1')).toBeInTheDocument()
  })

  it('edits one todo while others remain unchanged', async () => {
    const user = userEvent.setup()

    render(<App />)

    const input = screen.getByPlaceholderText('Введите задачу')
    const addBtn = screen.getByRole('button', { name: /добавить/i })

    await user.type(input, 'Задача 1')
    await user.click(addBtn)
    await user.type(input, 'Задача 2')
    await user.click(addBtn)

    const editBtns = screen.getAllByRole('button', { name: /редактировать/i })
    await user.click(editBtns[0])

    const listItem = screen.getAllByRole('listitem')[0]
    const editInput = within(listItem).getByRole('textbox')
    await user.clear(editInput)
    await user.type(editInput, 'Обновлённая 1')

    const saveBtn = screen.getByRole('button', { name: /сохранить/i })
    await user.click(saveBtn)

    expect(screen.getByText('Обновлённая 1')).toBeInTheDocument()
    expect(screen.getByText('Задача 2')).toBeInTheDocument()
  })
})
