import { DynamicObjectType } from 'module/utils/types'

export interface FilterCatergoriesProps {
  isOpen?: boolean
  categoryName: string
  categories: FilterCategoryWithCountType[] | []
  selectedNameCategories?: DynamicObjectType
  onChange?: (categories: { _id: string; title: string; category: string }[], category: string) => void
}

// export interface FilterCategoryItemProps extends Omit<FilterCategoryProps, 'count'> {
//   category: string
// }

export interface FilterCategoryProps {
  _id: string
  title: string
}

export type FilterCategoryWithCountType = FilterCategoryProps & {
  count?: number
}

export type FilterCategoryType = FilterCategoryProps & {
  category: string
}

export interface CategoryResponseProps {
  _id: string
  parent: { _id: string }
  sortOrder: number
  title: string
}
