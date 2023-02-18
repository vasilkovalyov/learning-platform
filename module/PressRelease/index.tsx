import React from 'react'

import SearchBlock from '../SearchBlock'
import FilterNews from '../FilterNews'
import Pagination from '../Pagination'
import CardsList from 'module/CardsList'

function PressRelease() {
  function nextPage(currentPage: number, nextPage: number) {
    console.log('next page')
  }
  function prevPage(currentPage: number, prevPage: number) {
    console.log('prev page')
  }

  return (
    <div className="page-press-release">
      <SearchBlock />
      <div className="page-press-release__container">
        <div className="page-press-release__grid">
          <FilterNews />
          <div className="page-press-release__content">
            <CardsList items={[]} />
            <p className="page-press-release__result-message">You've viewed 30 of 357 results</p>
            <Pagination totalPages={10} activePageNumber={1} onClickNextPage={nextPage} onClickPrevPage={prevPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PressRelease
