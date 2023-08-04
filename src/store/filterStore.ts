import { create } from 'zustand'
import { getFromLocalStorage, updateLocalStorage } from '../services/localStorage'
import { PAGES_FILTER, GENRE_FILTER } from '../consts/filters'

interface Filters {
  genres: string[]
  pages: string
  search: string
}
interface FilterState {
  filters: Filters
  updateFilters: <K extends keyof FilterState['filters']>(filterBy: K, filterParam: FilterState['filters'][K]) => void
}

const filterStore = create<FilterState>(set => ({
  filters: {
    genres: getFromLocalStorage(GENRE_FILTER) ?? [],
    pages: getFromLocalStorage(PAGES_FILTER) ?? '0',
    search: ''
  },
  updateFilters: (filterBy, filterParam) => set(state => {
    if (filterBy === GENRE_FILTER || filterBy === PAGES_FILTER) {
      updateLocalStorage(filterBy, filterParam)
    }
    return { filters: { ...state.filters, [filterBy]: filterParam } }
  })
}))

export default filterStore
