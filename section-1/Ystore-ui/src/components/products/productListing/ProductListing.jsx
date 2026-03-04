import React from "react";
import styles from "./ProductListing.module.css";
import ProductCard from "../productCard/ProductCard";
import SearchBox from "../../searchBox/SearchBox"

function productListing({ products }) {
  return (
    <>  
    <div className={styles.productListingsContainer}>
      <SearchBox></SearchBox>
      <div className={styles.productListingsGrid}>
        {
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          )
        )}
      </div>
    </div>
    </>
  );
}

export default productListing;
//
