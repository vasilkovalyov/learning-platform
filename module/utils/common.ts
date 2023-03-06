import { NewsCardProps } from 'module/NewsCard/NewsCard.type'
import {
  FilterCategoryWithCountType,
  FilterCategoryType,
  FilterCategory,
} from '../FilterCategoryGroup/FilterCategoryGroup.type'

export const getUniqCategoriesWithCount = (
  posts: NewsCardProps[],
  categoriesIds: {
    regions: string
    topics: string
    drinks: string
  },
): { [key: string]: FilterCategoryWithCountType[] } => {
  const years: {
    [key: string]: {
      _id: string
      count: number
    }
  } = {}
  const topics: {
    [key: string]: {
      _id: string
      count: number
    }
  } = {}
  const drinks: {
    [key: string]: {
      _id: string
      count: number
    }
  } = {}
  const regions: {
    [key: string]: {
      _id: string
      count: number
    }
  } = {}

  for (const post of posts) {
    const yearKey = new Date(post.articleDate).getFullYear()
    if (years[yearKey]) {
      years[yearKey] = {
        ...years[yearKey],
        count: (years[yearKey].count += 1),
      }
    } else {
      years[yearKey] = {
        _id: yearKey.toString(),
        count: 1,
      }
    }
    if (post.categoryPages) {
      for (const categories of post.categoryPages) {
        if (categories.parent._id === categoriesIds.topics) {
          if (topics[categories.title]) {
            topics[categories.title] = {
              _id: categories._id,
              count: (topics[categories.title].count += 1),
            }
          } else {
            topics[categories.title] = {
              _id: categories._id,
              count: 1,
            }
          }
        }
        if (categories.parent._id === categoriesIds.drinks) {
          if (drinks[categories.title]) {
            drinks[categories.title] = {
              _id: categories._id,
              count: (drinks[categories.title].count += 1),
            }
          } else {
            drinks[categories.title] = {
              _id: categories._id,
              count: 1,
            }
          }
        }
        if (categories.parent._id === categoriesIds.regions) {
          if (regions[categories.title]) {
            regions[categories.title] = {
              _id: categories._id,
              count: (regions[categories.title].count += 1),
            }
          } else {
            regions[categories.title] = {
              _id: categories._id,
              count: 1,
            }
          }
        }
      }
    }
  }

  const objResult: { [key: string]: FilterCategoryWithCountType[] } = {}

  objResult['years'] = getCategoriesWithCounters(years).reverse()
  objResult['regions'] = getCategoriesWithCounters(regions)
  objResult['topics'] = getCategoriesWithCounters(topics)
  objResult['drinks'] = getCategoriesWithCounters(drinks)

  return objResult
}

export const getCategoriesWithCounters = (categories: {
  [key: string]: {
    _id: string
    count: number
  }
}): FilterCategoryWithCountType[] => {
  return Object.keys(categories).map((category) => {
    return {
      _id: categories[category]._id,
      title: category,
      count: categories[category].count,
    }
  })
}

export function getParamsFromUrl(url: string): { [key: string]: string[] } {
  const urlParams = new URLSearchParams(url)
  const params = Object.fromEntries(urlParams.entries())
  const paramsResult: { [key: string]: string[] } = {}

  for (const key in params) {
    const values = params[key].split('<')
    paramsResult[key] = values
  }
  return paramsResult
}

export function setUrlParams(params: { [key: string]: [string] }) {
  const urlParams = new URLSearchParams()

  for (const filterKey in params) {
    const filterValues = params[filterKey]
    urlParams.append(filterKey, filterValues.join('<'))
  }

  return urlParams.toString()
}

export function replaceUrlState(url: string) {
  if (url.length === 0) {
    const path = window.location.pathname
    window.history.replaceState({ path: path }, '', path)
  } else {
    const newurl = `${window.location.pathname}?${url}`
    window.history.replaceState({ path: newurl }, '', newurl)
  }
}

export function getFilterCategoriesFromParsedUrlParams(
  categories: FilterCategory[],
  params: { [key: string]: string[] },
): FilterCategoryType[] | [] {
  return categories.reduce((accFilterCategories: FilterCategoryType[], category: FilterCategory) => {
    const paramsCategoryArray = params[category.categoryName]
    if (paramsCategoryArray && paramsCategoryArray.length) {
      for (const paramCategory of paramsCategoryArray) {
        const findedCategory = category.categories.find(
          (category) => category.title.toLowerCase() === paramCategory.toLowerCase(),
        )
        if (!findedCategory) return accFilterCategories
        accFilterCategories.push({
          _id: findedCategory._id,
          title: findedCategory.title,
          category: category.categoryName,
        })
      }
    }
    return accFilterCategories
  }, [] as FilterCategoryType[])
}
