import { create } from 'zustand'
import { getLibrary } from '../services/books'
import { Library, LibraryType } from '../books'

export interface LibraryState {
  availableBooks: Library
  toRead: Library
  updateLibrary: (libraryType: LibraryType, library: Library) => void
}

const getFromLocalStorage = (item: LibraryType) => {
  if (window.localStorage.getItem(item) !== null) {
    return JSON.parse(window.localStorage.getItem(item) as string)
  }

  return null
}

const libraryStore = create<LibraryState>((set) => ({
  availableBooks: getFromLocalStorage('availableBooks') ?? getLibrary(),
  toRead: getFromLocalStorage('toRead') ?? [],
  updateLibrary: (libraryType: LibraryType, library: Library) => set(state => ({
    ...state, [libraryType]: library
  }))
}))

export default libraryStore
