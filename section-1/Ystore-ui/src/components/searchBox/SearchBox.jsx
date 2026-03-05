import SearchTextInput from "./SearchTextInput/SearchTextInput"
import SortByInput from "./SortByInput/SortByInput"
import styles from "./SearchBox.module.css"

function SearchBox({ searchValue, onSearchChange, sortByValue, onSortByChange }) {
  return (
    <div className={styles.productListingsSearchContainer}>
      <SortByInput 
        value={sortByValue}
        onChange={onSortByChange}
      />
      <SearchTextInput 
        value={searchValue}
        onChange={onSearchChange}
      />
    </div>
  )
}

export default SearchBox;
