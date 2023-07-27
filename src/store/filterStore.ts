import { create } from 'zustand'
import { getFromLocalStorage, updateLocalStorage } from '../services/localStorage'

interface FilterState {
  selectedGenres: string[]
  updateSelectedGenres: (genres: string[]) => void
  pages: string
  updatePagesFilter: (newPages: string) => void
  search: string
  updateSearch: (newSearch: string) => void
}

const filterStore = create<FilterState>(set => ({
  selectedGenres: getFromLocalStorage('selectedGenres') ?? [],
  updateSelectedGenres: (genres) => set(() => {
    updateLocalStorage('selectedGenres', genres)
    return { selectedGenres: [...genres] }
  }),
  pages: getFromLocalStorage('pages') ?? '0',
  updatePagesFilter: (newPages: string) => set(() => {
    updateLocalStorage('pages', newPages)
    return { pages: newPages }
  }),
  search: '',
  updateSearch: (newSearch: string) => set(() => ({ search: newSearch }))
}))

export default filterStore
