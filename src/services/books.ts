import { Book, Library } from '../books'
import { GENRE_FILTER, PAGES_FILTER, SEARCH_FILTER } from '../consts/filters'
import json from '../db/books.json'

export type FilterType = 'genres' | 'search' | 'pages'
export interface FilterParams {
  search: string
  pages: string
  genres: string[]
}

export const getLibrary = (): Library => {
  const library: Library = json.library
  return library
}

export const filterLibrary = (filterParams: FilterParams, library: Library) => {
  let newLibrary: Library = [...library]
  let filterBy: FilterType[] = [PAGES_FILTER]

  if (filterParams.genres.length > 0) filterBy = [...filterBy, GENRE_FILTER]
  if (filterParams.search !== '') filterBy = [...filterBy, SEARCH_FILTER]

  const filterFunctions = {
    search: ({ book }: Book) => {
      const searchParam = filterParams.search.toLowerCase()
      return book.title.toLowerCase().includes(searchParam) || book.author.name.toLowerCase().includes(searchParam)
    },
    pages: ({ book }: Book) => book.pages >= parseInt(filterParams.pages)
  }

  if (filterBy.includes(GENRE_FILTER)) {
    newLibrary = (filterParams.genres as []).flatMap(genre => newLibrary.filter(({ book }) => book.genre === genre))
    filterBy = filterBy.filter(filter => filter !== GENRE_FILTER) // Don't filter by genre anymore
  }

  filterBy.forEach(filter => {
    newLibrary = newLibrary.filter(filterFunctions[filter as keyof typeof filterFunctions])
  })

  return newLibrary
}
