import { afterAll, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import AppHeader from '../components/AppHeader'
import AvailableBooks from '../components/AvailableBooks'

describe('Search input', () => {
  afterAll(cleanup)
  it('should display books based on search input', async () => {
    render(<AppHeader />)
    render(<AvailableBooks />)

    const searchInput = screen.getByPlaceholderText('Search by author or title')
    const searchButton = await screen.findByRole('button', { name: 'Search' })

    fireEvent.change(searchInput, { target: { value: 'El señor' } })
    fireEvent.click(searchButton)

    const book = screen.getByText('El Señor de los Anillos')
    const bookToNotBeRendered = screen.queryByText('Drácula')
    expect(book)
    expect(bookToNotBeRendered).toBeNull()
  })
})
