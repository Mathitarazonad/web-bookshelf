import { Book } from '../books'
import useLibrary from '../hooks/useLibrary'

export default function BookView ({ book }: Book) {
  const { availableBooks, toRead, updateLibraries } = useLibrary()
  const isReading = toRead.filter(({ book: b }) => b.ISBN === book.ISBN).length === 1

  const handleLibraryChange = () => {
    if (isReading) {
      const updatedAvailableBooks = [...availableBooks, { book }]
      const updatedReadingLibrary = toRead.filter(({ book: b }) => b.ISBN !== book.ISBN)
      updateLibraries('availableBooks', updatedAvailableBooks)
      updateLibraries('toRead', updatedReadingLibrary)
      return
    }
    const updatedAvailableBooks = availableBooks.filter(({ book: b }) => b.ISBN !== book.ISBN)
    const updatedReadingLibrary = [...toRead, { book }]
    updateLibraries('availableBooks', updatedAvailableBooks)
    updateLibraries('toRead', updatedReadingLibrary)
  }

  return (
    <article className='flex flex-col gap-4 bg-white p-4 rounded-md'>
      <header className='flex gap-2'>
        <section>
          <img src={book.cover} className='h-[140px] w-[100px] aspect-[9/16] max-w-none' />
        </section>
        <section>
          <h3 className='text-amber-700 font-bold text-xl'>{book.title}</h3>
          <h4 className='text-gray-600'>{book.author.name}</h4>
          <p className='text-gray-600'><span>Genre: </span>{book.genre}</p>
          <p className='text-gray-600'>{book.pages} pages</p>
        </section>
      </header>
      <footer className='mt-auto'>
        <button className='text-amber-950 font-semibold text-lg bg-amber-950 bg-opacity-[10%] border-amber-950 border-[2px] w-full py-2 rounded-md hover:bg-opacity-100 hover:text-white transition-all duration-150' type='button' onClick={() => handleLibraryChange()}>
          {isReading ? 'Remove from list' : 'Move to read'}
        </button>
      </footer>
    </article>
  )
}
