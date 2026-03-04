import React from "react";
import styles from "./ProductListing.module.css";
import ProductCard from "../productCard/ProductCard";

function productListing({ products }) {
  return (
    <div className={styles.productListingsContainer}>
      <div className={styles.productListingsGrid}>
        {
          products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          )
        )}
      </div>
    </div>
  );
}

export default productListing;
//
