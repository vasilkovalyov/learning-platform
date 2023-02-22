export interface FilterCatergoriesProps {
  isOpen?: boolean
  categoryName: string
  categories: FilterCategoryProps[] | []
  onChange?: (categories: { [title: string]: string }, categoryName: string) => void
}

export interface FilterCategoryProps {
  _id: string
  title: string
  count?: number
}

export interface CategoryResponseProps {
  _id: string
  parent: { _id: string }
  sortOrder: number
  title: string
}
