import React from 'react'

import { FilterTagsProps } from './FilterTags.type'

function FilterTags({ tags, onClick }: FilterTagsProps) {
  return (
    <ul className="filter-tags">
      {tags.map((tag) => (
        <li key={tag.id} className="filter-tags__item">
          <button onClick={() => onClick && onClick(tag.id)} className="filter-tag">
            {tag.title}
            <span className="filter-tag__icon">
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
          </button>
        </li>
      ))}
    </ul>
  )
}
export default FilterTags
