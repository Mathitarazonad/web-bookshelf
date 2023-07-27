import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'

export default function ReadingBooks () {
  const { toRead } = useLibrary()

  if (toRead.length === 0) {
    return
  }

  return (
    <section className='col-span-2 flex flex-col gap-4 bg-orange-800 bg-opacity-[15%] p-4 rounded-md h-max'>
      <h3 className='w-max font-semibold text-gray-700 text-center col-span-2 rounded-full border-2 border-gray-700 px-4 py-[2px]'>Reading List ({toRead.length})</h3>
      <div className='grid grid-cols-1 gap-4'>
        {toRead.map(({ book }) =>
          <BookView key={book.ISBN} book={book} />)}
      </div>
    </section>
  )
}
