import { NewsCardProps } from 'module/NewsCard/NewsCard.type'
import { FilterCategoryWithCountType, FilterCategoryType } from '../FilterCatergories/FilterCatergories.type'

type UniqCategoriesType = {
  [key: string]: {
    _id: string
    count: number
  }
}

type UniqCategoriesWithCountType = {
  regions: FilterCategoryWithCountType[]
  topics: FilterCategoryWithCountType[]
  drinks: FilterCategoryWithCountType[]
}

export const getUniqCategoriesWithCount = (
  posts: NewsCardProps[],
  categoriesIds: {
    regions: string
    topics: string
    drinks: string
  },
): UniqCategoriesWithCountType => {
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

  return {
    topics: getCategoriesWithCounters(topics),
    drinks: getCategoriesWithCounters(drinks),
    regions: getCategoriesWithCounters(regions),
  }
}

export const getPostsYearsWithStatistics = (posts: NewsCardProps[]): FilterCategoryWithCountType[] | [] => {
  if (!posts.length) return []

  const yearsMap: {
    [key: string]: {
      _id: string
      title: string
      count: number
    }
  } = {}

  for (const post of posts) {
    const yearKey = new Date(post.articleDate).getFullYear()
    if (yearsMap[yearKey]) {
      yearsMap[yearKey] = {
        ...yearsMap[yearKey],
        count: (yearsMap[yearKey].count += 1),
      }
    } else {
      yearsMap[yearKey] = {
        _id: yearKey.toString(),
        title: yearKey.toString(),
        count: 1,
      }
    }
  }

  return getCategoriesWithCounters(yearsMap).reverse()
}

export const getCategoriesWithCounters = (categories: UniqCategoriesType): FilterCategoryWithCountType[] => {
  return Object.keys(categories).map((category) => {
    return {
      _id: categories[category]._id,
      title: category,
      count: categories[category].count,
    }
  })
}

export const getGeneratedYears = (from: number, to: number): string[] | null => {
  if (to < from) return null
  const arrLength = to - from
  return [...Array(arrLength + 1).keys()].map((_, index) => (to - index).toString())
}

export const removeCategoryTagFromArray = (
  categories: FilterCategoryType[],
  id: string,
): [string, FilterCategoryType[]] => {
  let categoryName = ''
  const categoriesTags = categories.filter(({ _id, category }) => {
    if (_id === id) categoryName = category
    if (_id !== id) return category
  })
  return [categoryName, categoriesTags]
}
