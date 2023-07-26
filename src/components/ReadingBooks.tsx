import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'

export default function ReadingBooks () {
  const { toRead } = useLibrary()

  return (
    <section>
      <h3>TO READ BOOKS</h3>
      <div className='flex gap-4 flex-wrap'>
        {toRead.map(({ book }) =>
          <BookView key={book.ISBN} book={book} />)}
      </div>

    </section>
  )
}
