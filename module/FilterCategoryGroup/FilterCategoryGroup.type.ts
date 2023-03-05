import { DynamicObjectType } from 'module/utils/types'

export interface FilterCategory {
  isOpen?: boolean
  categoryName: string
  categories: FilterCategoryWithCountType[] | []
}

export interface FilterCategoriesProps extends FilterCategory {
  selectedCategories?: DynamicObjectType
  onChangeAdd?: (categories: FilterCategoryType[]) => void
  onChangeRemove?: (clickedCategory: FilterCategoryType) => void
}

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
