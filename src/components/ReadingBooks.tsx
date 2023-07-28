import useLibrary from '../hooks/useLibrary'
import BookView from './BookView'
import { motion, AnimatePresence } from 'framer-motion'

export default function ReadingBooks () {
  const { toRead } = useLibrary()

  if (toRead.length === 0) {
    return
  }

  return (
    <section className='col-span-2 h-max flex flex-col gap-4 bg-orange-800 bg-opacity-[15%] p-4 rounded-md'>
      <h3 className='w-max font-semibold text-orange-800 text-center col-span-2 rounded-full border-2 border-orange-800 px-4 py-[2px]'>Reading List ({toRead.length})</h3>
      <ul className='grid grid-cols-1 gap-4 list-none'>
        <AnimatePresence>
          {toRead.map(({ book }) =>
            <motion.li key={book.ISBN} layout exit='hidden' transition={{ layout: { duration: 0.1 } }}>
              <BookView book={book} />
            </motion.li>)}
        </AnimatePresence>
      </ul>
    </section>
  )
}
