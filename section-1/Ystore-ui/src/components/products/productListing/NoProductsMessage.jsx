import React from 'react'
import styles from "./NoProductsMessage.module.css";

function NoProductsMessage() {
  return (
    <>
    <p className={styles.productListingsEmpty}>
        No stickers available for now, we're sorry {":("}
    </p>
    <p className={styles.secondaryText}>Come back later for more awesome stickers!</p>
    </> 
  )
}

export default NoProductsMessage