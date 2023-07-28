import useLibrary from '../hooks/useLibrary'
import filterStore from '../store/filterStore'
import { motion, AnimatePresence } from 'framer-motion'

export default function BooksByGenre () {
  const { availableBooks } = useLibrary()
  const { selectedGenres } = filterStore()
  const booksBySelectedGenres = selectedGenres.map(genre => {
    const booksByGenre = availableBooks.filter(({ book }) => book.genre === genre).length
    return ({ genre, quantity: booksByGenre })
  })

  return (
    <AnimatePresence>
      {booksBySelectedGenres.map(genres =>
        <motion.h3
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          layout
          className='w-max font-semibold text-orange-800 text-center col-span-2 rounded-full border-2 border-orange-800 px-4 py-[3px]'
          key={`${genres.genre}${genres.quantity}`}
        >
          {genres.genre} ({genres.quantity})
        </motion.h3>)}
    </AnimatePresence>
  )
}
