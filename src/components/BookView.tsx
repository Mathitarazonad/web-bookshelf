import { Book } from '../books'
import { AVAILABLE_BOOKS, TO_READ } from '../consts/libraries'
import useLibrary from '../hooks/useLibrary'
import { LazyMotion, m, domMax } from 'framer-motion'

export default function BookView ({ book }: Book) {
  const { availableBooks, toRead, updateLibraries } = useLibrary()
  const isReading = toRead.filter(({ book: b }) => b.ISBN === book.ISBN).length === 1

  const handleLibraryChange = () => {
    if (isReading) {
      const updatedAvailableBooks = [...availableBooks, { book }]
      const updatedReadingLibrary = toRead.filter(({ book: b }) => b.ISBN !== book.ISBN)
      updateLibraries(AVAILABLE_BOOKS, updatedAvailableBooks)
      updateLibraries(TO_READ, updatedReadingLibrary)
      return
    }
    const updatedAvailableBooks = availableBooks.filter(({ book: b }) => b.ISBN !== book.ISBN)
    const updatedReadingLibrary = [...toRead, { book }]
    updateLibraries(AVAILABLE_BOOKS, updatedAvailableBooks)
    updateLibraries(TO_READ, updatedReadingLibrary)
  }

  return (
    <LazyMotion features={domMax}>
      <m.article
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className='flex flex-col gap-4 bg-white p-4 rounded-md'
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0, x: -50 }}
      >
        <header className='flex gap-2'>
          <section>
            <img src={book.cover} className='h-[140px] w-[100px] aspect-[9/16] max-w-none' />
          </section>
          <section>
            <h3 className='text-amber-700 font-bold text-xl'>{book.title}</h3>
            <h4 className='text-gray-600 font-semibold'>{book.author.name}</h4>
            <p className='text-gray-600'><span className='font-semibold'>Genre: </span>{book.genre}</p>
            <p className='text-gray-600'>{book.pages} pages</p>
          </section>
        </header>
        <footer className='mt-auto'>
          <button className='text-white font-semibold text-lg bg-orange-800 w-full py-2 rounded-md hover:bg-opacity-70 transition-all duration-150' type='button' onClick={() => handleLibraryChange()}>
            {isReading ? 'Remove from list' : 'Move to read'}
          </button>
        </footer>
      </m.article>
    </LazyMotion>
  )
}
