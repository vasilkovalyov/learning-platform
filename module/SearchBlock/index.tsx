import React from 'react'

import { useNewsContext } from '../context/news-context'

import Search from '../Search'

function SearchBlock() {
  const { setSearchValue } = useNewsContext()

  return (
    <div className="search-block">
      <div className="search-block__container">
        <Search
          id={'search'}
          placeholder="Search by keyword or region"
          name="search"
          label="I'm interested in..."
          onChange={(e) => setSearchValue && setSearchValue(e.currentTarget.value)}
        />
      </div>
    </div>
  )
}

export default React.memo(SearchBlock)
