import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import Filters from '../components/Filters'
import AvailableBooks from '../components/AvailableBooks'
import 'intersection-observer'

describe('Terror genre filter', () => {
  afterEach(cleanup)
  const { queryAllByRole, queryAllByText } = render(<AvailableBooks />)
  const { getByRole } = render(<Filters />)

  const terrorFilter = getByRole('checkbox', { name: 'Terror (4)' })
  const terrorBooksQuantity = queryAllByText('Terror').length
  fireEvent.click(terrorFilter)

  it('should render only zombies books', () => {
    expect(queryAllByRole('article').length).toBe(terrorBooksQuantity)
  })
})
