import { Book, Library } from '../books'
import json from '../db/books.json'

type FilterType = 'genre' | 'search' | 'pages'

export const getLibrary = (): Library => {
  const library: Library = json.library
  return library
}

export const filterLibrary = (filterBy: FilterType, filterParam: string | string[], library: Library) => {
  const newLibrary: Library = [...library]

  const filterFunctions = {
    search: ({ book }: Book) => book.title.toLowerCase().includes((filterParam as string).toLowerCase()) || book.author.name.toLowerCase().includes((filterParam as string).toLowerCase()),
    pages: ({ book }: Book) => book.pages >= parseInt(filterParam as string)
  }

  if (filterBy === 'genre') {
    if (filterParam.length === 0) return newLibrary
    const sortedLibrary = (filterParam as []).flatMap(genre => newLibrary.filter(({ book }) => book.genre === genre))
    return sortedLibrary
  }

  const sortedLibrary = newLibrary.filter(filterFunctions[filterBy])
  return sortedLibrary
}
