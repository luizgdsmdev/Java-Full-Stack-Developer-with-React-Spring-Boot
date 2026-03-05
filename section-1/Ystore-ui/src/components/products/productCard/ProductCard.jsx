import PopularityProduct from "./popularityProduct/PopularityProduct";
import styles from "./ProductCard.module.css";
import ProductPrice from "./ProductPrice";

function ProductCard({ product }) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardImageContainer}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className={styles.productCardImage}
        />
      </div>
      <div className={styles.productCardDetails}>
        <div className={styles.productCardTitleContainer}>
          <h4 className={styles.productCardTitle}>{product.name}</h4>
          <PopularityProduct rating={product.popularity} />
        </div>
        <p className={styles.productCardDescription}>{product.description}</p>
        <div className={styles.productCardFooter}>
          <div className={styles.productCardPrice}>
            <ProductPrice currency="$ " price={product.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
