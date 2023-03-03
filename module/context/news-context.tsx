import React, { ReactNode, createContext, useContext } from 'react'
import { FilterCategoryType } from '../FilterCatergories/FilterCatergories.type'

interface NewsContextStateProps {
  yearFilters: FilterCategoryType[] | []
  setYearFilters?: (filters: FilterCategoryType[]) => void
  regionFilters: FilterCategoryType[] | []
  setRegionFilters?: (filters: FilterCategoryType[]) => void
  topicFilters: FilterCategoryType[] | []
  setTopicFilters?: (filters: FilterCategoryType[]) => void
  drinkFilters: FilterCategoryType[] | []
  setDrinkFilters?: (filters: FilterCategoryType[]) => void
  searchValue: string
  setSearchValue?: (value: string) => void
}

type Props = {
  children: ReactNode
} & NewsContextStateProps

const initialContextState: NewsContextStateProps = {
  yearFilters: [],
  regionFilters: [],
  topicFilters: [],
  drinkFilters: [],
  searchValue: '',
  setYearFilters: () => ({})
  setRegionFilters: () => ({})
  setTopicFilters: () => ({})
  setDrinkFilters: () => ({})
}

export const NewsStateContext = createContext<NewsContextStateProps>(initialContextState)

export function NewsProvider({ children, ...props }: Props) {
  return <NewsStateContext.Provider value={props}>{children}</NewsStateContext.Provider>
}

export function useNewsContext(): NewsContextStateProps {
  const state = useContext(NewsStateContext)
  return state
}
