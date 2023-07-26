import { Library, LibraryType } from '../books'
import libraryStore from '../store/libraryStore'

export default function useLibrary () {
  const { availableBooks, toRead, updateLibrary } = libraryStore((state) => state)

  const updateLibraries = (libraryType: LibraryType, library: Library) => {
    updateLibrary(libraryType, library)
    window.localStorage.setItem(libraryType, JSON.stringify(library))
  }

  return { availableBooks, toRead, updateLibraries }
}
