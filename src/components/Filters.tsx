import { GENRE_FILTER, PAGES_FILTER } from '../consts/filters'
import useLibrary from '../hooks/useLibrary'
import { getFromLocalStorage } from '../services/localStorage'
import filterStore from '../store/filterStore'
import { useEffect, useMemo } from 'react'

export default function Filters () {
  const genres = useLibrary().getAllGenres()
  const { filters, updateFilters } = filterStore()
  const { availableBooks } = useLibrary()
  const maxNumberOfPages = useMemo(() => {
    return availableBooks.reduce((prev, { book }) => book.pages > prev ? book.pages : prev, 0)
  }, [availableBooks])

  useEffect(() => {
    if (parseInt(filters.pages) > maxNumberOfPages) updateFilters(PAGES_FILTER, JSON.stringify(maxNumberOfPages))
  }, [maxNumberOfPages])

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked: checkState, value } = e.target
    let updatedGenres = [...filters.genres]

    if (checkState) {
      updatedGenres = [...updatedGenres, value]
    } else {
      updatedGenres = filters.genres.filter(gen => gen !== value)
    }
    updateFilters(GENRE_FILTER, updatedGenres)
  }

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters(PAGES_FILTER, e.target.value)
  }

  useEffect(() => {
    window.addEventListener('storage', (e) => {
      if (e.key === GENRE_FILTER) updateFilters(GENRE_FILTER, getFromLocalStorage(GENRE_FILTER))
      if (e.key === PAGES_FILTER) updateFilters(PAGES_FILTER, getFromLocalStorage(PAGES_FILTER))
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
                checked={filters.genres.includes(gen)}
              />
              <label htmlFor={gen} className='text-gray-600 font-medium'>
                {gen} ({availableBooks.filter(({ book }) => book.genre === gen).length})
              </label>
            </div>)}
        </fieldset>
        <fieldset>
          <label className='text-base text-orange-800 font-bold'>
            {filters.pages} min pages
          </label>
          <input
            type='range'
            min={0} max={maxNumberOfPages}
            id='pages'
            onChange={handlePageChange}
            value={filters.pages}
          />
        </fieldset>
      </div>
    </div>
  )
}
