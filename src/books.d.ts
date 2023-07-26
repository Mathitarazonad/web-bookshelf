export type Library = Book[]

export interface Book {
  book: {
    title: string
    pages: number
    genre: string
    cover: string
    synopsis: string
    year: number
    ISBN: string
    author: {
      name: string
      otherBooks: string[]
    }
  }
}

export type LibraryType = 'availableBooks' | 'toRead'
