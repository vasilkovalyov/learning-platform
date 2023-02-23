import React, { useEffect, useMemo, useState } from 'react'

import { PaginationWithDataProps } from './PaginationWithData.type'

import Pagination from '../Pagination'

function PaginationWithData<T>({ data, Component, showStatistics, paginationOptions }: PaginationWithDataProps<T>) {
  const PageSize = paginationOptions?.pageSize || 5

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [viewedPosts, setViewedPosts] = useState<number>(PageSize)

  useEffect(() => {
    setViewedPosts(currentPage)
  }, [currentPage])

  const newsData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    const posts = data.slice(firstPageIndex, lastPageIndex)
    return posts
  }, [currentPage])

  return (
    <div className="container-with-pagination">
      <div className="container-with-pagination__data">
        {newsData.length && newsData.map((item, index) => <Component key={index} {...item} />)}
      </div>
      {showStatistics ? (
        <p className="container-with-pagination__result-message">
          You've viewed {viewedPosts} of {data.length} results
        </p>
      ) : null}
      <Pagination
        pageSize={1}
        {...paginationOptions}
        currentPage={currentPage}
        totalCount={data.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  )
}

export default PaginationWithData
