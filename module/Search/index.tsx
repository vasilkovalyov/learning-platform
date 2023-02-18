import React from 'react'

import { SearchProps } from './Search.type'

function Search({ value, name, placeholder, label, id }: SearchProps) {
  return (
    <div className="block-search">
      {label && (
        <label className="block-search__label" htmlFor="search-input">
          {label}
        </label>
      )}
      <div className="search-input">
        <div className="search-input__box">
          <input
            type="search"
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            className="search-input__field"
          />
        </div>
        <button className="search-input__submit" aria-label="Search" type="submit">
          <svg
            viewBox="0 0 24 24"
            fill="inherit"
            preserveAspectRatio="xMidYMax meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="inherit"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.9587 16.9437L23.7924 22.7761C24.0692 23.0528 24.0692 23.5104 23.7924 23.7871C23.654 23.9308 23.4677 24 23.2868 24C23.1058 24 22.9195 23.9255 22.7811 23.7871L16.9474 17.9548C15.1484 19.5193 12.8011 20.4665 10.2355 20.4665C4.59348 20.4665 0 15.8741 0 10.2333C0 4.59246 4.58816 0 10.2355 0C15.8776 0 20.4711 4.58714 20.4711 10.2333C20.4711 12.7982 19.5236 15.145 17.9587 16.9437ZM10.2281 1.43652C5.37912 1.43652 1.42969 5.37976 1.42969 10.233C1.42969 15.0862 5.37912 19.0347 10.2281 19.0347C15.0824 19.0347 19.0265 15.0809 19.0265 10.233C19.0265 5.38508 15.0824 1.43652 10.2281 1.43652Z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Search
