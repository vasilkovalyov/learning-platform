import React, { useState } from 'react'

import { FilterCatergoriesProps } from './FilterCatergories.type'

function FilterCatergories({ categories, categoryName, isOpen = true }: FilterCatergoriesProps) {
  const [show, setShow] = useState<boolean>(isOpen)

  return (
    <div className="filter">
      <h3 className="filter-title">
        <button onClick={() => setShow(!show)}>
          <span className="filter-title-text">{categoryName}</span>
          <span className="filter-title-count">{0}</span>
          <span className="filter-title-icon">
            {show ? (
              <svg
                viewBox="0 0 10 10"
                fill="black"
                preserveAspectRatio="xMidYMax meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.75 4.25V0H4.25V4.25H0V5.75H4.25V10H5.75V5.75H10V4.25H5.75Z"
                  fill="inherit"
                ></path>
              </svg>
            ) : (
              <svg
                viewBox="0 0 8 2"
                fill="black"
                preserveAspectRatio="xMidYMax meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M0 0.5H8V1.5H0V0.5Z" fill="inherit"></path>
              </svg>
            )}
          </span>
        </button>
      </h3>
      {categories.length ? (
        <div className="filter-options" style={{ display: show ? 'block' : 'none' }}>
          {categories.map(({ id, count, title }) => (
            <div key={id} className="filter-option">
              <span>
                <b>
                  {title} ({count})
                </b>
              </span>
              <span className="filter-option-icon">
                <svg
                  viewBox="0 0 8 9"
                  fill="inherit"
                  preserveAspectRatio="xMidYMax meet"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 1.2L7.3 0.5L4 3.8L0.7 0.5L0 1.2L3.3 4.5L0 7.8L0.7 8.5L4 5.2L7.3 8.5L8 7.8L4.7 4.5L8 1.2Z"
                    fill="inherit"
                  ></path>
                </svg>
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default FilterCatergories
