import { render, screen } from '@testing-library/react'
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
})
