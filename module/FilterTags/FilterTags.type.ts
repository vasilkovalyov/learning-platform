import { FilterCategoryType } from '../FilterCatergories/FilterCatergories.type'

export interface FilterTagsProps {
  tags: FilterCategoryType[] | []
  handleChange?: (_id: string) => void
}
