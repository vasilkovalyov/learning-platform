import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import { FilterCategoriesProps, FilterCategoryType, FilterCategoryWithCountType } from './FilterCategoryGroup.type'
import { DynamicObjectType } from 'module/utils/types'

function objectToArray(obj: { [key: string]: string }, category: string): FilterCategoryType[] | [] {
  if (!Object.keys(obj).length) return []

  const array: FilterCategoryType[] = []
  for (const key in obj) {
    const item = {
      _id: obj[key],
      title: key,
      category: category,
    }
    array.push(item)
  }

  return array
}

function FilterCategoryGroup({
  categories,
  categoryName,
  isOpen = true,
  selectedCategories,
  onChangeAdd,
  onChangeRemove,
}: FilterCategoriesProps) {
  const [show, setShow] = useState<boolean>(isOpen)
  const [selectedCategoriesMap, setSelectedCategoriesMap] = useState<DynamicObjectType>(selectedCategories || {})

  useEffect(() => {
    setSelectedCategoriesMap(selectedCategories || {})
  }, [selectedCategories])

  function onHandleCategory(category: FilterCategoryWithCountType) {
    const selectedCategory: FilterCategoryType = {
      _id: category._id,
      title: category.title,
      category: categoryName,
    }

    if (selectedCategoriesMap[category.title]) {
      const tempState = { ...selectedCategoriesMap }
      delete tempState[category.title]
      setSelectedCategoriesMap(tempState)
      onChangeRemove && onChangeRemove(selectedCategory)
    } else {
      const state = {
        ...selectedCategoriesMap,
        [category.title]: category._id,
      }
      setSelectedCategoriesMap(state)
      onChangeAdd && onChangeAdd(objectToArray(state, categoryName))
    }
  }

  return (
    <div className="filter">
      <button className="filter__title" onClick={() => setShow(!show)}>
        <span className="filter__title-text">{categoryName}</span>
        {Object.keys(selectedCategoriesMap).length ? (
          <span className="filter__title-count" style={{ margin: '0 4px' }}>
            ({Object.keys(selectedCategoriesMap).length})
          </span>
        ) : null}
        <span className="filter__title-icon">
          {show ? (
            <svg viewBox="0 0 8 2" fill="black" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0.5H8V1.5H0V0.5Z" fill="inherit"></path>
            </svg>
          ) : (
            <svg
              viewBox="0 0 10 10"
              fill="black"
              preserveAspectRatio="xMidYMax meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.75 4.25V0H4.25V4.25H0V5.75H4.25V10H5.75V5.75H10V4.25H5.75Z"
                fill="inherit"
              ></path>
            </svg>
          )}
        </span>
      </button>
      {categories && categories.length ? (
        <div className="filter-options" style={{ display: show ? 'block' : 'none' }}>
          {categories.map((category) => (
            <button
              className={cn('filter-option', { active: selectedCategoriesMap[category.title] })}
              key={category._id}
              onClick={() => onHandleCategory(category)}
            >
              <span className="filter-option__title">
                {category.title}
                {category.count ? <b style={{ margin: '0 4px' }}>({category.count})</b> : null}
              </span>
              <span className="filter-option__icon">
                <svg
                  viewBox="0 0 8 9"
                  fill="inherit"
                  preserveAspectRatio="xMidYMax meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 1.2L7.3 0.5L4 3.8L0.7 0.5L0 1.2L3.3 4.5L0 7.8L0.7 8.5L4 5.2L7.3 8.5L8 7.8L4.7 4.5L8 1.2Z"
                    fill="inherit"
                  ></path>
                </svg>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FilterCategoryGroup
