import React, { useState } from 'react'
import cn from 'classnames'

import { PaginationControlButtonProps, PaginationPageLinkProps, PaginationProps, PageType } from './Pagination.type'

function PaginationControlButton({ title, type, disabled, onClick }: PaginationControlButtonProps) {
  return (
    <a
      className={`pagination__item__${type}__link`}
      role="button"
      aria-disabled={disabled}
      aria-label={`${type} page`}
      rel={type}
      onClick={onClick}
    >
      <div className="pagination__item__nav">
        {title}
        {type === 'prev' ? (
          <svg width="15" height="15" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.99687 5L0.996875 10L0.296875 9.3L4.59688 5L0.296875 0.7L0.996875 0L5.99687 5Z"
              fill="black"
            ></path>
          </svg>
        ) : null}
        {type === 'next' ? (
          <svg width="15" height="15" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.99687 5L0.996875 10L0.296875 9.3L4.59688 5L0.296875 0.7L0.996875 0L5.99687 5Z"
              fill="black"
            ></path>
          </svg>
        ) : null}
      </div>
    </a>
  )
}

function PaginationPageLink({ pageNumber, active }: PaginationPageLinkProps) {
  return (
    <li className={cn('pagination__item', { 'pagination__item-active': active })}>
      <a role="button" className="pagination__item__link">
        {pageNumber}
      </a>
    </li>
  )
}

function Pagination({ totalPages, activePageNumber = 1, onClickNextPage, onClickPrevPage }: PaginationProps) {
  const [activePage, setActivePage] = useState<number>(1)
  function onClickButtonController(type: PageType) {
    if (type === 'next') {
      onHandleNextPage()
    }
    if (type === 'prev') {
      onHandlePrevPage()
    }
  }

  function onHandlePrevPage() {
    if (activePage - 1 > 0) {
      setActivePage((prev) => prev - 1)
      onClickPrevPage(activePage, activePage - 1)
    }
  }

  function onHandleNextPage() {
    if (activePage + 1 < totalPages) {
      setActivePage((prev) => prev + 1)
      onClickNextPage(activePage, activePage + 1)
    }
  }

  return (
    <ul className="pagination">
      <li className="pagination__item pagination__item__prev disabled">
        <PaginationControlButton title="prev" type="prev" onClick={() => onClickButtonController('prev')} />
      </li>
      {Array.from(Array(totalPages).keys()).map((page, index) => (
        <PaginationPageLink key={index} pageNumber={page} active={activePageNumber === page} />
      ))}
      <li className="pagination__item__break">
        <a className="pagination__item__break__link" role="button">
          …
        </a>
      </li>
      <li className="pagination__item pagination__item__next">
        <PaginationControlButton title="next" type="next" onClick={() => onClickButtonController('next')} />
      </li>
    </ul>
  )
}

export default Pagination
