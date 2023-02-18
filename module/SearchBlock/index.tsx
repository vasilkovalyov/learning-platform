import React from 'react'

import Search from '../Search'

function SearchBlock() {
  return (
    <div className="searchblock">
      <Search
        id={'search'}
        placeholder="Search by keyword or region"
        value={''}
        name="search"
        label="I'm interested in..."
      />
    </div>
  )
}

export default SearchBlock
