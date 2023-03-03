import React, { useState } from 'react'

import PressRelease from 'module/PressRelease'
import { NewsCardProps } from '../../module/NewsCard/NewsCard.type'

import { NewsProvider } from '../../module/context/news-context'
import { FilterCategoryType } from 'module/FilterCatergories/FilterCatergories.type'

const News = () => {
  const [yearFilters, setYearFilters] = useState<FilterCategoryType[] | []>([])
  const [regionFilters, setRegionFilters] = useState<FilterCategoryType[] | []>([])
  const [topicFilters, setTopicFilters] = useState<FilterCategoryType[] | []>([])
  const [drinkFilters, setDrinkFilters] = useState<FilterCategoryType[] | []>([])
  const [searchValue, setSearchValue] = useState<string>('')

  const state = {
    yearFilters,
    regionFilters,
    topicFilters,
    drinkFilters,
    searchValue,
    setYearFilters,
    setRegionFilters,
    setTopicFilters,
    setDrinkFilters,
    setSearchValue,
  }

  return (
    <NewsProvider {...state}>
      <PressRelease />
    </NewsProvider>
  )
}

export default News
