import React, { useState } from 'react'

import FilterCatergories from '../FilterCatergories'
import { NewsCardProps } from '../NewsCard/NewsCard.type'

import regionCategories from '../data/region.json'
import topicsCategories from '../data/topics.json'
import drinksCategories from '../data/drink-categories.json'
import data from '../data/news.json'

import { getPostsYearsWithStatistics, getUniqCategoriesWithCount } from '../utils/common'

const news = data.data.contents as unknown as NewsCardProps[]

function FilterNews() {
  const [selectedCategoriesMap, setSelectedCategoriesMap] = useState<{ _id: string; title: string }[]>([])
  const years = getPostsYearsWithStatistics(news)
  const { drinks, regions, topics } = getUniqCategoriesWithCount(news, {
    regions: '7f29687ae0aaa141b26c2424',
    topics: 'cf8eec3db2b7ad4e8faf783b',
    drinks: 'f0ceba0eaf460647a97e76eb',
  })

  function handleChangeFilter(categories: { [title: string]: string }, categoryName: string) {
    const setCollection = new Set()
    for (const key in categories) {
      setCollection.add({
        id: key,
        title: categories[key],
      })
    }
    const arr = [Array.from(setCollection)]
  }

  return (
    <div className="filters">
      <button className="btn" style={{ display: 'none' }}>
        <span className="btn__inner">
          <svg
            viewBox="0 0 16 16"
            fill="inherit"
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 3.49958H12.45C12.2134 2.33441 11.1889 1.49707 10 1.49707C8.81106 1.49707 7.7866 2.33441 7.55 3.49958H1V4.49958H7.55C7.7866 5.66474 8.81106 6.50208 10 6.50208C11.1889 6.50208 12.2134 5.66474 12.45 4.49958H15V3.49958ZM10 5.49958C9.17157 5.49958 8.5 4.828 8.5 3.99958C8.5 3.17115 9.17157 2.49958 10 2.49958C10.8284 2.49958 11.5 3.17115 11.5 3.99958C11.5 4.828 10.8284 5.49958 10 5.49958ZM1 12.4996H3.55C3.7866 13.6647 4.81106 14.5021 6 14.5021C7.18894 14.5021 8.2134 13.6647 8.45 12.4996H15V11.4996H8.45C8.2134 10.3344 7.18894 9.49707 6 9.49707C4.81106 9.49707 3.7866 10.3344 3.55 11.4996H1V12.4996ZM4.5 11.9996C4.5 11.1711 5.17157 10.4996 6 10.4996C6.82843 10.4996 7.5 11.1711 7.5 11.9996C7.5 12.828 6.82843 13.4996 6 13.4996C5.17157 13.4996 4.5 12.828 4.5 11.9996Z"
              fill="inherit"
            ></path>
          </svg>
          Filters (0)
        </span>
      </button>
      <div className="filters__content">
        <div className="filters__title">
          Filter by: <button className="filters__button-reset">clear all</button>
        </div>
        <div className="filter-groups">
          <FilterCatergories categoryName="Year" categories={years} onChange={handleChangeFilter} />
          <FilterCatergories categoryName="Region" categories={regions} onChange={handleChangeFilter} />
          <FilterCatergories categoryName="Topics" categories={topics} onChange={handleChangeFilter} />
          <FilterCatergories categoryName="Drink categories" categories={drinks} onChange={handleChangeFilter} />
        </div>
      </div>
    </div>
  )
}

export default FilterNews
