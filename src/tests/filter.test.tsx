import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import AvailableBooks from '../components/AvailableBooks'
import Filters from '../components/Filters'

describe('Filters', () => {
  render(<AvailableBooks />)
  render(<Filters />)

  it('should display only terror books when terror filter is active', () => {
    const terrorFilter = screen.getByRole('checkbox', { name: 'Terror (4)' })
    const terrorBooks = screen.queryAllByText('Terror').length
    fireEvent.click(terrorFilter)
    expect(screen.queryAllByRole('article').length).toBe(terrorBooks)
  })
})
