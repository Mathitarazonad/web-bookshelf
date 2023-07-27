import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import AvailableBooks from '../components/AvailableBooks'
import ReadingBooks from '../components/ReadingBooks'

describe('Move Book Button', () => {
  const availableBooks = render(<AvailableBooks />)
  const readingBooks = render(<ReadingBooks />)

  const initialNumberOfBooks = availableBooks.getAllByText('Move to read').length

  const availableBook = screen.getAllByRole('article')[0]
  const moveButton = within(availableBook).getByRole('button')
  fireEvent.click(moveButton)

  it('should remove 1 book from available books', () => {
    expect(availableBooks.getAllByText('Move to read').length).toBe(initialNumberOfBooks - 1)
  })

  it('should switch 1 item to reading list', () => {
    expect(readingBooks.getAllByText('Remove from list').length).toBe(1)
  })
})
