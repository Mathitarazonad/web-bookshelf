import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import 'intersection-observer'
import AvailableBooks from '../components/AvailableBooks'
import Filters from '../components/Filters'

describe('Range Filter', () => {
  const { queryAllByRole } = render(<AvailableBooks />)
  const { getByRole } = render(<Filters />)
  const rangeInput = getByRole('slider')

  fireEvent.change(rangeInput, { target: { value: 1200 } })
  it('should display only terror books when terror filter is active', () => {
    const filteredBooks = queryAllByRole('article')
    expect(filteredBooks.length).toBe(1)
  })
})
