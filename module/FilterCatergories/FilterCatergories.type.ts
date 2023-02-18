export interface FilterCatergoriesProps {
  isOpen?: boolean
  categoryName: string
  categories: FilterCategoryProps[]
}

export interface FilterCategoryProps {
  id: string
  title: string
  count: number
}
