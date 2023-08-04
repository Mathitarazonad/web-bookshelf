import { useRef } from 'react'
import filterStore from '../store/filterStore'
import { SEARCH_FILTER } from '../consts/filters'

export default function AppHeader () {
  const searchInput = useRef<null | HTMLInputElement>(null)
  const updateSearch = filterStore().updateFilters
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateSearch(SEARCH_FILTER, (searchInput.current as HTMLInputElement).value)
  }

  return (
    <header className='relative bg-[url("./assets/desktop-bg.webp")] aspect-video w-screen bg-cover bg-center max-h-[500px]'>
      <div className='absolute m-auto w-full h-full flex flex-col gap-2 items-center justify-center'>
        <h1 className='w-full text-orange-800 text-center text-8xl font-bold up'>Web Bookshelf</h1>
        <form className='flex flex-col gap-4 w-[510px] justify-center items-center' onSubmit={handleSearch}>
          <h2 className='text-orange-950 font-semibold text-5xl'>Search for your book</h2>
          <div className='flex gap-2 w-full'>
            <input type='text' placeholder='Search by author or title' className='px-4 py-3 flex-1 rounded-md text-orange-950 font-semibold outline-none' ref={searchInput} />
            <button type='submit' className='rounded-md border-2 text-orange-800 border-orange-800 bg-orange-800 bg-opacity-20 font-semibold px-6 hover:bg-opacity-100 hover:text-white duration-150'>Search</button>
          </div>
        </form>
      </div>
    </header>
  )
}
