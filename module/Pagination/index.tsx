import React, { useState, useMemo } from 'react'
import cn from 'classnames'

import { PaginationControlButtonProps, PaginationPageLinkProps, PaginationProps, PageType } from './Pagination.type'

import { usePagination, DOTS, UserPaginationProps } from './usePagination'

function PaginationControlButton({ title, type, disabled, onClick }: PaginationControlButtonProps) {
  return (
    <a
      className={cn(`pagination__page-control pagination__page-control--${type}`, { disabled: disabled })}
      role="button"
      aria-label={`${type} page`}
      rel={type}
      onClick={onClick}
    >
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
    </a>
  )
}

function PaginationPageLink({ pageNumber, active, onClick }: PaginationPageLinkProps) {
  return (
    <li className="pagination__item">
      <a
        role="button"
        className={cn('pagination__page-button', { 'pagination__page-button--active': active })}
        onClick={onClick}
      >
        {pageNumber}
      </a>
    </li>
  )
}

function Pagination({ onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className }: PaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  if (currentPage === 0 || paginationRange.length < 2) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return (
    <ul className={cn('pagination', className)}>
      <li className="pagination__item">
        <PaginationControlButton title="prev" type="prev" onClick={onPrevious} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className="pagination__item--break">
              &#8230;
            </li>
          )
        }

        return (
          <PaginationPageLink
            key={index}
            pageNumber={+pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onPageChange(+pageNumber)}
          />
        )
      })}
      <li className="pagination__item">
        <PaginationControlButton title="next" type="next" onClick={onNext} disabled={currentPage === lastPage} />
      </li>
    </ul>
  )
}

export default Pagination
