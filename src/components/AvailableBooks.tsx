import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'

export default function AvailableBooks () {
  const { availableBooks } = useLibrary()

  return (
    <ul className='flex gap-4 flex-wrap'>
      {availableBooks.map(({ book }) =>
        <BookView key={book.ISBN} book={book} />)}
    </ul>
  )
}
