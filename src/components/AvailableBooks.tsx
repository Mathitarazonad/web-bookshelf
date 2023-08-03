import { useEffect, useState } from 'react'
import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'
import filterStore from '../store/filterStore'
import { filterLibrary } from '../services/books'
import { getFromLocalStorage } from '../services/localStorage'
import BooksByGenre from './BooksByGenre'
import { AnimatePresence, motion } from 'framer-motion'
import { GENRE_FILTER, PAGES_FILTER, SEARCH_FILTER } from '../consts/filters'
import { AVAILABLE_BOOKS, TO_READ } from '../consts/libraries'

export default function AvailableBooks () {
  const { availableBooks, toRead } = useLibrary()
  const { selectedGenres, pages, search } = filterStore()
  const [updatedAvailableBooks, setUpdatedAvailableBooks] = useState([...availableBooks])

  useEffect(() => {
    let filteredLibrary = filterLibrary(GENRE_FILTER, selectedGenres, availableBooks)
    filteredLibrary = filterLibrary(PAGES_FILTER, pages, filteredLibrary)
    if (search !== '') filteredLibrary = filterLibrary(SEARCH_FILTER, search, filteredLibrary)
    setUpdatedAvailableBooks(filteredLibrary)
  }, [selectedGenres, availableBooks, pages, search])

  const { updateLibraries } = useLibrary()

  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.key === AVAILABLE_BOOKS || event.key === TO_READ) {
        const [updatedAvailableBooks, updatedToReadBooks] = [
          getFromLocalStorage(AVAILABLE_BOOKS),
          getFromLocalStorage(TO_READ)
        ]
        updateLibraries(AVAILABLE_BOOKS, updatedAvailableBooks, false)
        updateLibraries(TO_READ, updatedToReadBooks, false)
      }
    })
  }, [])

  return (
    <section className='col-span-4 h-max flex flex-col gap-4 bg-orange-800 bg-opacity-[15%] p-4 rounded-md last:col-span-6'>
      <div className='flex flex-wrap gap-2'>
        <h3 className='w-max font-semibold text-orange-800 text-center col-span-2 rounded-full border-2 border-orange-800 px-4 py-[3px]'>Available Books ({availableBooks.length})</h3>
        <BooksByGenre />
      </div>
      <motion.ul className={toRead.length === 0 ? 'grid grid-cols-3 gap-4 list-none' : 'grid grid-cols-2 gap-4  list-none'}>
        <AnimatePresence>
          {updatedAvailableBooks.map(({ book }) =>
            <motion.li
              key={book.ISBN + 'available'}
              layout
              transition={{ layout: { duration: 0.2 }, exit: { duration: 0.05 } }}
              exit='hidden'
            >
              <BookView book={book} />
            </motion.li>)}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}
