import { Book } from '../books'

export default function BookView ({ book }: Book) {
  return (
    <article className='flex flex-col w-[300px]'>
      <header className='flex gap-2'>
        <section>
          <img src={book.cover} width={100} className='h-[150px]' />
        </section>
        <section>
          <h3>{book.title}</h3>
          <h4>{book.author.name}</h4>
          <p><span>Genre: </span>{book.genre}</p>
          <p>{book.pages} pages</p>
        </section>
      </header>
      <footer>
        <button>Move to read</button>
      </footer>
    </article>
  )
}
