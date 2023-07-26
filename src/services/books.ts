import { Book, Library } from '../books'
import json from '../db/books.json'

type FilterType = 'genre' | 'title' | 'author'

export const getLibrary = (): Library => {
  const library: Library = json.library
  return library
}

export const filterLibrary = (filterBy: FilterType, filterParam: string, library: Library) => {
  const newLibrary: Library = [...library]

  const filterFunctions = {
    genre: ({ book }: Book) => book.genre.toLowerCase().includes(filterParam.toLowerCase()),
    title: ({ book }: Book) => book.title.toLowerCase().includes(filterParam.toLowerCase()),
    author: ({ book }: Book) => book.author.name.toLowerCase().includes(filterParam.toLowerCase()),
    pages: ({ book }: Book) => book.pages >= parseInt(filterParam)
  }

  const sortedLibrary = newLibrary.filter(filterFunctions[filterBy])
  return sortedLibrary
}
