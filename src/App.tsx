import AppHeader from './components/AppHeader'
import AvailableBooks from './components/AvailableBooks'
import Filters from './components/Filters'
import ReadingBooks from './components/ReadingBooks'

function App () {
  return (
    <main className='bg-white flex flex-wrap gap-4 font-poppins'>
      <AppHeader />
      <div className='grid gap-4 grid-cols-7 p-4 w-full min-h-[500px]'>
        <Filters />
        <AvailableBooks />
        <ReadingBooks />
      </div>
    </main>
  )
}

export default App
