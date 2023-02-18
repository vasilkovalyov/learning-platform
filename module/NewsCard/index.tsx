import React from 'react'

import { NewsCardProps } from './NewsCard.type'

import Image from '../Image'

function NewsCard({ id, image, articleDate, title, caterories }: NewsCardProps) {
  return (
    <div id={id} className="news-card">
      <Image {...image} />
      <div className="card__body">
        <div className="card__content">
          <ul className="card__date bare-list flex flex-wrap">
            <li className="card__date-item">{articleDate}</li>
            <li className="card__date-item"> Press Release </li>
          </ul>
          <h4 className="card__heading font-semibold">{title}</h4>
          {caterories.length ? (
            <ul className="card__tags bare-list flex flex-wrap">
              {caterories.map((caterory, index) => (
                <li key={index} className="card__tags-item">
                  {caterory}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default NewsCard
