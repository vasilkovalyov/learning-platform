export interface PaginationProps {
  className?: string
  totalCount: number
  currentPage: number
  pageSize: number
  onPageChange: (pageNumber: number) => void
  siblingCount?: number
  // onClickNextPage: (currentPageNum: number, nextPageNum: number) => void
  // onClickPrevPage: (currentPageNum: number, prevPageNum: number) => void
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
  onClick: () => void
}
