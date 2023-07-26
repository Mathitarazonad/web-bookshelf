import { create } from 'zustand'

interface FilterState {
  selectedGenres: string[]
  updateSelectedGenres: (genres: string[]) => void
  pages: string | number
  updatePagesFilter: (newPages: number) => void
}

const getFromLocalStorage = (item: string) => {
  if (window.localStorage.getItem(item) !== null) {
    return JSON.parse(window.localStorage.getItem(item) as string)
  }

  return null
}

const filterStore = create<FilterState>(set => ({
  selectedGenres: getFromLocalStorage('selectedGenres') ?? [],
  updateSelectedGenres: (genres) => set(() => {
    window.localStorage.setItem('selectedGenres', JSON.stringify(genres))
    return { selectedGenres: [...genres] }
  }),
  pages: getFromLocalStorage('pages') ?? 0,
  updatePagesFilter: (newPages: number) => set(() => ({ pages: newPages }))
}))

export default filterStore
