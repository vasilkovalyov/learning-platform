export interface FilterCatergoriesProps {
  isOpen?: boolean
  categoryName: string
  selectedCount: number
  categories: FilterCategoryProps[] | []
}

export interface FilterCategoryProps {
  id: string
  title: string
  count?: number
}

export interface CategoryResponseProps {
  _id: string
  parent: { _id: string }
  sortOrder: number
  title: string
}
