import styles from "./NoProductsMessage.module.css";

function NoProductsMessage() {
  return (
    <div className={styles.noProductsContainer}>
    <p className={styles.productListingsEmpty}>
        No stickers available for now, we're sorry {":("}
    </p>
    <p className={styles.secondaryText}>
      Check your search term or come back later for more awesome stickers!
    </p>
    </div> 
  )
}

export default NoProductsMessage