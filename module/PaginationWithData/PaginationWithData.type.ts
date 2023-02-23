import { PaginationProps } from '../Pagination/Pagination.type'

export interface PaginationWithDataProps<DataType> {
  data: DataType[]
  Component: React.FC<DataType>
  showStatistics: boolean
  paginationOptions?: Partial<Omit<PaginationProps, 'onPageChange'>>
}
