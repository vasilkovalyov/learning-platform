import { FilterCategory, FilterCategoryType } from 'module/FilterCategoryGroup/FilterCategoryGroup.type'
import { DynamicObjectType } from 'module/utils/types'

export interface FilterCategoriesProps {
  categories: FilterCategory[]
  selectedCategories?: FilterCategoryType[] | []
  onSelectCategories: (categories: FilterCategoryType[]) => void
}
