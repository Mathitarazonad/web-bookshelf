import { useEffect, useState } from 'react'
import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'
import filterStore from '../store/filterStore'
import { filterLibrary } from '../services/books'

export default function AvailableBooks () {
  const { availableBooks } = useLibrary()
  const { selectedGenres, pages } = filterStore()
  const [updatedAvailableBooks, setUpdatedAvailableBooks] = useState([...availableBooks])

  useEffect(() => {
    let filteredLibrary = filterLibrary('genre', selectedGenres, availableBooks)
    filteredLibrary = filterLibrary('pages', pages, filteredLibrary)
    setUpdatedAvailableBooks(filteredLibrary)
  }, [selectedGenres, availableBooks, pages])

  return (
    <section className='flex gap-4 flex-wrap'>
      {updatedAvailableBooks.map(({ book }) =>
        <BookView key={book.ISBN} book={book} />)}
    </section>
  )
}
