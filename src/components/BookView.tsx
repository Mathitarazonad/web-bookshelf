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
    <article className='flex flex-col w-[300px]'>
      <header className='flex gap-2'>
        <section>
          <img src={book.cover} width={100} className='h-[150px]' />
        </section>
        <section>
          <h3>{book.title}</h3>
          <h4>{book.author.name}</h4>
          <p><span>Genre: </span>{book.genre}</p>
          <p>{book.pages} pages</p>
        </section>
      </header>
      <footer>
        <button type='button' onClick={() => handleLibraryChange()}>
          {isReading ? 'Remove from list' : 'Move to read'}
        </button>
      </footer>
    </article>
  )
}
