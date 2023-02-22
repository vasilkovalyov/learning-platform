import React from 'react'

import { CardsListProps } from './CardsList.type'
import NewsCard from '../NewsCard'
import { NewsCardProps } from '../NewsCard/NewsCard.type'

function CardsList<T extends NewsCardProps>({ items }: CardsListProps<T>) {
  return (
    <div className="cards-list">
      {items.length ? items.map((card) => <NewsCard key={card._id} {...(card as T)} />) : null}
    </div>
  )
}

export default CardsList
