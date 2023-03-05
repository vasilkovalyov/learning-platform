import React, { useState, useEffect } from 'react'
import { FilterCategoriesProps } from './FilterCategories.type'

import FilterCategoryGroup from '../FilterCategoryGroup'
import { FilterCategoryType } from '../FilterCategoryGroup/FilterCategoryGroup.type'

import { DynamicObjectType } from 'module/utils/types'

export function convertCategoryObjects(categories: FilterCategoryType[]): DynamicObjectType {
  const categoriesMap: DynamicObjectType = {}
  for (const category of categories) {
    categoriesMap[category.title] = category._id
  }
  return categoriesMap
}

function FilterCategories({ categories, selectedCategories, onSelectCategories }: FilterCategoriesProps) {
  const [selectedCategoriesMap, setSelectedCategoriesMap] = useState<FilterCategoryType[] | []>([])

  useEffect(() => {
    setSelectedCategoriesMap(selectedCategories || [])
  }, [selectedCategories])

  function handleChangeFilterAdd(categories: FilterCategoryType[]) {
    let updatedCategories: FilterCategoryType[] = []
    updatedCategories = Array.from([
      ...new Map([...selectedCategoriesMap, ...categories].map((item) => [item.title, item])).values(),
    ])

    setSelectedCategoriesMap(updatedCategories)
    onSelectCategories(updatedCategories)
  }
  function handleChangeFilterRemove(clickedCategory: FilterCategoryType) {
    let updatedCategories: FilterCategoryType[] = []
    updatedCategories = selectedCategoriesMap.filter((category) => category.title !== clickedCategory.title)

    setSelectedCategoriesMap(updatedCategories)
    onSelectCategories(updatedCategories)
  }

  return (
    <div className="filters">
      <div className="filters__content">
        <div className="filters__title">
          Filter by: <button className="filters__button-reset">clear all</button>
        </div>
        {categories
          ? categories.map((category, index) => {
              const updatedCategories = selectedCategories
                ? convertCategoryObjects(
                    selectedCategories.filter(
                      (item) => item.category.toLowerCase() === category.categoryName.toLowerCase(),
                    ),
                  )
                : {}
              return (
                <div key={index} className="filter-groups">
                  <FilterCategoryGroup
                    categoryName={category.categoryName}
                    selectedCategories={updatedCategories}
                    categories={category.categories}
                    onChangeAdd={handleChangeFilterAdd}
                    onChangeRemove={handleChangeFilterRemove}
                  />
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default React.memo(FilterCategories)
