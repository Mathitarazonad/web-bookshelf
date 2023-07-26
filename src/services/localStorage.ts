export const getFromLocalStorage = (key: string) => {
  if (window.localStorage.getItem(key) !== null) {
    return JSON.parse(window.localStorage.getItem(key) as string)
  }

  return null
}

export const updateLocalStorage = (key: string, item: unknown) => {
  window.localStorage.setItem(key, JSON.stringify(item))
}
