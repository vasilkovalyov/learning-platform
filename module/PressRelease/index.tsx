import React, { useEffect, useState, useMemo } from 'react'

import { useNewsContext } from '../context/news-context'

import SearchBlock from '../SearchBlock'
import FilterNews from '../FilterNews'
import NewsCard from 'module/NewsCard'
import FilterTags from 'module/FilterTags'
import { NewsCardProps } from 'module/NewsCard/NewsCard.type'
import { removeCategoryTagFromArray } from 'module/utils/common'
import { Categories } from 'module/utils/enums'

import PaginationWithData from '../PaginationWithData'

import dataNews from '../data/news.json'

const getFilteredNewsByTitle = (posts: NewsCardProps[], value: string | null): NewsCardProps[] | [] => {
  if (!value) return []
  return posts.filter((post) => post.title.toLowerCase().includes(value.toLowerCase()))
}

function PressRelease() {
  const {
    drinkFilters,
    regionFilters,
    topicFilters,
    yearFilters,
    searchValue,
    setDrinkFilters,
    setRegionFilters,
    setTopicFilters,
    setYearFilters,
  } = useNewsContext()
  const defaultNews = dataNews.data.contents
  const [news, setNews] = useState<NewsCardProps[] | []>(defaultNews)

  const tags = useMemo(() => {
    return [...drinkFilters, ...regionFilters, ...topicFilters, ...yearFilters]
  }, [drinkFilters, regionFilters, topicFilters, yearFilters])

  function filterTagsOnChange(categoryId: string) {
    const [categoryName, tagsCategories] = removeCategoryTagFromArray(tags, categoryId)

    if (categoryName === Categories.year) setYearFilters && setYearFilters(tagsCategories)
    if (categoryName === Categories.region) setRegionFilters && setRegionFilters(tagsCategories)
    if (categoryName === Categories.topics) setTopicFilters && setTopicFilters(tagsCategories)
    if (categoryName === Categories.drinks) setDrinkFilters && setDrinkFilters(tagsCategories)
  }

  useEffect(() => {
    if (searchValue !== '') {
      setNews(getFilteredNewsByTitle(defaultNews, searchValue))
    } else {
      setNews(dataNews.data.contents)
    }
  }, [searchValue])

  return (
    <div className="page-press-release">
      <SearchBlock />
      <div className="page-press-release__container">
        <div className="page-press-release__grid">
          <FilterNews />
          <div className="page-press-release__content">
            {searchValue ? <h3>{searchValue}</h3> : null}
            <FilterTags tags={tags} handleChange={filterTagsOnChange} />
            <PaginationWithData data={news} Component={NewsCard} showStatistics={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressRelease
