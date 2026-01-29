import React from "react";
import styles from "./ProductListing.module.css";
import ProductCard from "../productCard/ProductCard";

function productListing({ products }) {
  return (
    <div className={styles.productListingsContainer}>
      <div className={styles.productListingsGrid}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.productListingsEmpty}>
            No stickers available for now, we're sorry {":("}.
          </p>
        )}
      </div>
    </div>
  );
}

export default productListing;
