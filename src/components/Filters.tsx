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

  useEffect(() => {
    if (parseInt(pages) > maxNumberOfPages) updatePagesFilter(JSON.stringify(maxNumberOfPages))
  }, [maxNumberOfPages])

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
    <div className='col-span-1 flex flex-col w-full h-max border-r-2 border-orange-800 border-opacity-10 '>
      <h3 className='text-2xl text-orange-800 font-bold'>Filter by</h3>
      <div className='flex flex-col gap-2'>
        <fieldset>
          <legend className='text-orange-800 font-semibold text-lg'>Genre</legend>
          {genres.map(gen =>
            <div className='flex gap-2' key={gen}>
              <input
                type='checkbox'
                id={gen}
                value={gen}
                onChange={handleGenreChange}
                checked={selectedGenres.includes(gen)}
              />
              <label htmlFor={gen} className='text-gray-600 font-medium'>
                {gen} ({availableBooks.filter(({ book }) => book.genre === gen).length})
              </label>
            </div>)}
        </fieldset>
        <fieldset>
          <label className='text-base text-orange-800 font-bold'>
            {pages} min pages
          </label>
          <input
            type='range'
            min={0} max={maxNumberOfPages}
            id='pages'
            onChange={handlePageChange}
            value={pages}
          />
        </fieldset>
      </div>
    </div>
  )
}
