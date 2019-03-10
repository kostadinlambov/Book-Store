import React from 'react'
import BookCard from './BookCard'

const BookCardList = (props) => {
  let allBook = props.products
  let bookCardList = []
  for (let i = 0; i < allBook.length; i += 3) {
    let bookCards = allBook.slice(i, Math.min(i + 3, allBook.length))
      .map(p => (
        <BookCard
          key={p._id}
          id={p._id}
          title={p.title}
          image={p.image}
          description={p.description}
          authot={p.author} />))

    let cardDeck = <div key={i} className='card-deck space-top'>{bookCards}</div>
    bookCardList.push(cardDeck)
  }

  return (
    <div className='row'>
      {bookCardList}
    </div>
  )
}

export default BookCardList
