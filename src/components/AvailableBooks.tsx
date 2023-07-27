import { useEffect, useState } from 'react'
import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'
import filterStore from '../store/filterStore'
import { filterLibrary } from '../services/books'
import { getFromLocalStorage } from '../services/localStorage'

export default function AvailableBooks () {
  const { availableBooks } = useLibrary()
  const { selectedGenres, pages, search } = filterStore()
  const [updatedAvailableBooks, setUpdatedAvailableBooks] = useState([...availableBooks])

  useEffect(() => {
    let filteredLibrary = filterLibrary('genre', selectedGenres, availableBooks)
    filteredLibrary = filterLibrary('pages', pages, filteredLibrary)
    if (search !== '') filteredLibrary = filterLibrary('search', search, filteredLibrary)
    setUpdatedAvailableBooks(filteredLibrary)
  }, [selectedGenres, availableBooks, pages, search])

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
    <section className='col-span-3 h-max flex flex-col gap-4 bg-orange-800 bg-opacity-[15%] p-4 rounded-md'>
      <h3 className='w-max font-semibold text-gray-700 text-center col-span-2 rounded-full border-2 border-gray-700 px-4 py-[2px]'>
        Available Books ({availableBooks.length})
      </h3>
      <div className='grid grid-cols-2 gap-6'>
        {updatedAvailableBooks.map(({ book }) =>
          <BookView key={book.ISBN} book={book} />)}
      </div>
    </section>
  )
}
