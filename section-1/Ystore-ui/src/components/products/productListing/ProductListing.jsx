import styles from "./ProductListing.module.css";
import ProductCard from "../productCard/ProductCard";
import SearchBox from "../../searchBox/SearchBox";
import debounce from 'lodash/debounce';
import { useState, useMemo } from 'react';
import NoProductsMessage from "./NoProductsMessage";

function ProductListing({ products }) {
  const [searchValue, setSearchValue] = useState('');
  const [sortByValue, setSortByValue] = useState('');

  // Debounce created once to avoid recreation on every render
  const debouncedSetSearch = useMemo(
    () => debounce((newValue) => {

      // Ensure only valid strings enter the state
      if (typeof newValue === 'string') {
        setSearchValue(newValue);
      } else {
        console.warn('Non-string value received in debounce:', newValue);
        setSearchValue('');
      }
    }, 100),
    []
  );

  // Function wrapper to pass to child (avoids passing the debounced function directly as a value prop)
  const handleSearchChange = (value) => {
    debouncedSetSearch(value);
  };

  const searchTerm = (searchValue || '').toLowerCase().trim();

  const filteredProducts = products.filter((product) =>
    // Protection in case product.name is not a string
    String(product?.name || '').toLowerCase().includes(searchTerm) ||
    String(product?.description || '').toLowerCase().includes(searchTerm)
  );

  // Basic sort products based on sortByValue
  if(sortByValue == "desc"){
    filteredProducts.sort((a, b) => b.price - a.price);
  }else if(sortByValue == "asc"){
    filteredProducts.sort((a, b) => a.price - b.price);
  }else{
    filteredProducts.sort((a, b) => a.popularity - b.popularity);
  }

  return (
    <>
      <div className={styles.productListingsContainer}>
        <SearchBox
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          sortByValue={sortByValue}
          onSortByChange={setSortByValue}
        />

        <div className={styles.productListingsGrid}>
          {/* Check if filteredProducts is an array and has elements to avoid errors on screen */}
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (

           filteredProducts.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))

          ) : (
            <NoProductsMessage/>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductListing;