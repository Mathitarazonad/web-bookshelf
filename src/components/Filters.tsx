import useLibrary from '../hooks/useLibrary'
import { getFromLocalStorage } from '../services/localStorage'
import filterStore from '../store/filterStore'
import { useEffect, useMemo } from 'react'

export default function Filters () {
  const genres = useLibrary().getAllGenres()
  const { selectedGenres, updateSelectedGenres, pages, updatePagesFilter } = filterStore()
  const { availableBooks } = useLibrary()
  const maxNumberOfPages = useMemo(() => {
    return availableBooks.reduce((prev, { book }) => book.pages > prev ? book.pages : prev, 0)
  }, [availableBooks])

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: checkState, value } = e.target
    if (checkState) {
      updateSelectedGenres([...selectedGenres, value])
    } else {
      updateSelectedGenres(selectedGenres.filter(gen => gen !== value))
    }
  }

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePagesFilter(e.target.value)
  }

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === 'selectedGenres') updateSelectedGenres(getFromLocalStorage('selectedGenres'))
      if (e.key === 'pages') updatePagesFilter(getFromLocalStorage('pages'))
    })
  }, [])

  return (
    <div className='col-span-1 flex flex-col w-full h-max border-r-2 border-amber-950 border-opacity-10 '>
      <h3 className='text-2xl text-amber-950 font-semibold'>Filter by</h3>
      <fieldset>
        <legend>Genre</legend>
        {genres.map(gen =>
          <div className='flex gap-2' key={gen}>
            <label htmlFor={gen}>
              {gen} ({availableBooks.filter(({ book }) => book.genre === gen).length})
            </label>
            <input
              type='checkbox'
              id={gen}
              value={gen}
              onChange={handleGenreChange}
              checked={selectedGenres.includes(gen)}
            />
          </div>)}
      </fieldset>
      <fieldset>
        <label htmlFor='pages'>Pages</label>
        <input
          type='range'
          min={0} max={maxNumberOfPages}
          id='pages'
          onChange={handlePageChange}
          value={parseInt(pages) > maxNumberOfPages ? maxNumberOfPages : pages}
        />
        <p>{pages} min pages</p>
      </fieldset>
    </div>
  )
}
