import { NewsCardProps } from 'module/NewsCard/NewsCard.type'
import { FilterCategoryProps } from '../FilterCatergories/FilterCatergories.type'

type UniqCategoriesType = {
  [key: string]: {
    _id: string
    count: number
  }
}

type UniqCategoriesWithCountType = {
  regions: FilterCategoryProps[]
  topics: FilterCategoryProps[]
  drinks: FilterCategoryProps[]
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
    const topic = post.categoryPages?.find((item) => item.parent._id === categoriesIds.topics)
    const drink = post.categoryPages?.find((item) => item.parent._id === categoriesIds.drinks)
    const region = post.categoryPages?.find((item) => item.parent._id === categoriesIds.regions)

    if (topic) {
      if (topics && topics[topic?.title]) {
        topics[topic.title] = {
          ...topics[topic.title],
          count: (topics[topic.title].count += 1),
        }
      } else {
        topics[topic.title] = {
          _id: topic._id,
          count: 1,
        }
      }
    }
    if (drink) {
      if (drinks && drinks[drink?.title]) {
        drinks[drink.title] = {
          ...drinks[drink.title],
          count: (drinks[drink.title].count += 1),
        }
      } else {
        drinks[drink.title] = {
          _id: drink._id,
          count: 1,
        }
      }
    }
    if (region) {
      if (regions && regions[region?.title]) {
        regions[region.title] = {
          ...regions[region.title],
          count: (regions[region.title].count += 1),
        }
      } else {
        regions[region.title] = {
          _id: region._id,
          count: 1,
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

export const getPostsYearsWithStatistics = (posts: NewsCardProps[]): FilterCategoryProps[] | [] => {
  if (!posts.length) return []

  const yearsMap: {
    [key: string]: {
      _id: string
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
        count: 1,
      }
    }
  }

  return getCategoriesWithCounters(yearsMap).reverse()
}

export const getCategoriesWithCounters = (categories: UniqCategoriesType): FilterCategoryProps[] => {
  return Object.keys(categories).map((category) => {
    return {
      id: categories[category]._id,
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
