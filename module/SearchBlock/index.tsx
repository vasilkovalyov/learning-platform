import React from 'react'

import Search from '../Search'

function SearchBlock() {
  return (
    <div className="search-block">
      <div className="search-block__container">
        <Search
          id={'search'}
          placeholder="Search by keyword or region"
          value={''}
          name="search"
          label="I'm interested in..."
        />
      </div>
    </div>
  )
}

export default React.memo(SearchBlock)
