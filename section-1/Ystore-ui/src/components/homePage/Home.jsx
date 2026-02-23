import styles from "./Home.module.css";
import PageHeader from "../shared/pageHeader/PageHeader";
import ProductListing from "../products/productListing/productListing";
import { fetchProductsAPI } from "../../API/product/ProductFetch";
import { useState, useEffect } from "react";


const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProductsAPI();
      setProducts(products);
    };

    loadProducts();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <PageHeader
        title="Explore Ystore stickers"
        subtitle="Add a touch of creativity to your space with our wide range of fun and unique stickers. Perfect for any occasion!"
      />
      <ProductListing products={products} />
    </div>
  );
};

export default Home;
