import React from 'react'

import { NewsCardProps } from './NewsCard.type'

import Image from '../Image'

import { getDateFormat } from '../utils/date-format'

function NewsCard({ id, pageListingImage, articleDate, title, categoryPages }: NewsCardProps) {
  return (
    <div id={id} className="news-card">
      {pageListingImage ? (
        <Image id={pageListingImage._id} url={pageListingImage.url} alt={title} className="news-card__image" />
      ) : null}
      <div className="news-card__body">
        <div className="news-card__content">
          <ul className="news-card__date">
            <li className="news-card__date-item">{getDateFormat(articleDate)}</li>
            <li className="news-card__date-item"> Press Release </li>
          </ul>
          <h4 className="news-card__heading">{title}</h4>
          {categoryPages && categoryPages.length ? (
            <ul className="news-card__tags">
              {categoryPages.map((caterory) => (
                <li key={caterory._id} className="news-card__tags-item">
                  {caterory.title}
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
