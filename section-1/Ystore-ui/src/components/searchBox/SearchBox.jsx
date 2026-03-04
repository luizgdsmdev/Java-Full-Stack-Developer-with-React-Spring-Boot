import React, { useState } from 'react'
import SearchTextInput from "./SearchTextInput/SearchTextInput"
import SortByInput from "./SortByInput/SortByInput"
import styles from "./SearchBox.module.css"

function SearchBox() {
  const [searchValue, setSearchValue] = useState("")

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <div className={styles.productListingsSearchContainer}>
      <SortByInput></SortByInput>
      <SearchTextInput placeholder="Search for some stickers" value={searchValue} onChange={handleSearchChange} />
    </div>
  )
}

export default SearchBox;
