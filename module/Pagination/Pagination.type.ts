export interface PaginationProps {
  totalPages: number
  activePageNumber: number
  onClickNextPage: (currentPageNum: number, nextPageNum: number) => void
  onClickPrevPage: (currentPageNum: number, prevPageNum: number) => void
}

export type PageType = 'prev' | 'next'

export interface PaginationControlButtonProps {
  title: string
  type: PageType
  disabled?: boolean
  onClick: () => void
}

export interface PaginationPageLinkProps {
  pageNumber: number
  active: boolean
}
