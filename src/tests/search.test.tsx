import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import AppHeader from '../components/AppHeader'
import AvailableBooks from '../components/AvailableBooks'

describe('Search input', () => {
  render(<AppHeader />)
  render(<AvailableBooks />)

  const searchInput = screen.getByPlaceholderText('Search by author or title')
  const searchButton = screen.getByRole('button', { name: 'Search' })

  fireEvent.change(searchInput, { target: { value: 'El señor' } })
  fireEvent.click(searchButton)

  it('should display books based on search input', () => {
    const bookToBeRendered = screen.getByText('El Señor de los Anillos')
    expect(bookToBeRendered)
  })

  it('should not display books that not match the search input', () => {
    const bookToNotBeRendered = screen.queryByText('Drácula')
    expect(bookToNotBeRendered).toBeNull()
  })
})
