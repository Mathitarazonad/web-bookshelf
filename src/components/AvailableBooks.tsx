import { useEffect, useState } from 'react'
import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'
import filterStore from '../store/filterStore'
import { filterLibrary } from '../services/books'
import { getFromLocalStorage } from '../services/localStorage'

export default function AvailableBooks () {
  const { availableBooks } = useLibrary()
  const { selectedGenres, pages } = filterStore()
  const [updatedAvailableBooks, setUpdatedAvailableBooks] = useState([...availableBooks])

  useEffect(() => {
    let filteredLibrary = filterLibrary('genre', selectedGenres, availableBooks)
    filteredLibrary = filterLibrary('pages', pages, filteredLibrary)
    setUpdatedAvailableBooks(filteredLibrary)
  }, [selectedGenres, availableBooks, pages])

  const { updateLibraries } = useLibrary()

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === 'availableBooks' || event.key === 'toRead') {
        const [updatedAvailableBooks, updatedToReadBooks] = [
          getFromLocalStorage('availableBooks'),
          getFromLocalStorage('toRead')
        ]
        updateLibraries('availableBooks', updatedAvailableBooks, false)
        updateLibraries('toRead', updatedToReadBooks, false)
      }
    })
  }, [])

  return (
    <section className='flex gap-4 flex-wrap'>
      {updatedAvailableBooks.map(({ book }) =>
        <BookView key={book.ISBN} book={book} />)}
    </section>
  )
}
