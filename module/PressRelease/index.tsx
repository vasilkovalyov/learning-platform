import React, { useMemo, useState } from 'react'

import SearchBlock from '../SearchBlock'
import FilterNews from '../FilterNews'
import Pagination from '../Pagination'
import CardsList from 'module/CardsList'
import FilterTags from 'module/FilterTags'

import dataNews from '../data/news.json'

function PressRelease() {
  const PageSize = 10

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [viewedPosts, setViewedPosts] = useState<number>(PageSize)
  const news = dataNews.data.contents

  const newsData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    const posts = news.slice(firstPageIndex, lastPageIndex)
    setViewedPosts(posts.length * currentPage)
    return posts
  }, [currentPage])

  return (
    <div className="page-press-release">
      <SearchBlock />
      <div className="page-press-release__container">
        <div className="page-press-release__grid">
          <FilterNews />
          <div className="page-press-release__content">
            <FilterTags tags={[]} />
            <CardsList items={newsData} />
            <p className="page-press-release__result-message">
              You've viewed {viewedPosts} of {news.length} results
            </p>
            <Pagination
              currentPage={currentPage}
              totalCount={news.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressRelease
