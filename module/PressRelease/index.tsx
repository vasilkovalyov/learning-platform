import React from 'react'

import SearchBlock from '../SearchBlock'
import FilterNews from '../FilterNews'
import NewsCard from 'module/NewsCard'
import FilterTags from 'module/FilterTags'

import PaginationWithData from '../PaginationWithData'

import dataNews from '../data/news.json'

function PressRelease() {
  const news = dataNews.data.contents

  return (
    <div className="page-press-release">
      <SearchBlock />
      <div className="page-press-release__container">
        <div className="page-press-release__grid">
          <FilterNews />
          <div className="page-press-release__content">
            <FilterTags tags={[]} />
            <PaginationWithData data={news} Component={NewsCard} showStatistics={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressRelease
