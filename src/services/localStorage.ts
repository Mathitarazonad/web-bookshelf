export type LocalStorageKey = 'genres' | 'pages' | 'availableBooks' | 'toRead'

export const getFromLocalStorage = (key: LocalStorageKey) => {
  if (window.localStorage.getItem(key) !== null) {
    return JSON.parse(window.localStorage.getItem(key) as string)
  }

  return null
}

export const updateLocalStorage = (key: LocalStorageKey, item: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(item))
}
