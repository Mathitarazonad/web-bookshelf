import { Library, LibraryType } from '../books'
import { getLibrary } from '../services/books'
import libraryStore from '../store/libraryStore'

export default function useLibrary () {
  const { availableBooks, toRead, updateLibrary } = libraryStore((state) => state)

  const updateLibraries = (libraryType: LibraryType, library: Library) => {
    updateLibrary(libraryType, library)
    window.localStorage.setItem(libraryType, JSON.stringify(library))
  }

  const getAllGenres = () => {
    const library = getLibrary()
    const genres = new Set(library.map(({ book }) => book.genre))

    return [...genres]
  }

  return { availableBooks, toRead, updateLibraries, getAllGenres }
}
