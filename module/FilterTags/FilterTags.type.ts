import { FilterCategoryType } from '../FilterCategoryGroup/FilterCategoryGroup.type'

export interface FilterTagsProps {
  tags: FilterCategoryType[] | []
  handleChange?: (_id: string) => void
}
