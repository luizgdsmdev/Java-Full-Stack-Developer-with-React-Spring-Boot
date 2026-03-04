import styles from "./Home.module.css";
import PageHeader from "../shared/pageHeader/PageHeader";
import ProductListing from "../products/productListing/productListing";
import { fetchProductsAPI } from "../../API/product/ProductFetch";
import { useState, useEffect } from "react";
import Loading from "../shared/loading/Loading";
import Error from "../shared/error/Error";
import NoProductsMessage from "../products/productListing/NoProductsMessage";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loadingEffect, setLoadingEffect] = useState(true);
  const [errorEffect, setErrorEffect] = useState(false);

  const fetchProducts = async () => {
  setLoadingEffect(true);
  setErrorEffect(false);

  try {
    const products = await fetchProductsAPI();
    setProducts(products);
  } catch (error) {
    console.error("Products fetch went wrong:", error);
    setErrorEffect(true);
  } finally {
    setLoadingEffect(false);
  }
};

useEffect(() => {
  fetchProducts();
}, []);

  return (
    <>
    {loadingEffect && <Loading />}    
    <div className={styles.homeContainer}>


    {!loadingEffect && (
      <>
        <PageHeader
          title="Explore Ystore stickers"
          subtitle="Add a touch of creativity to your space with our wide range of fun and unique stickers. Perfect for any occasion!"
        />

        {errorEffect ? (
          <Error />
        ) : products.length === 0 ? (
          <NoProductsMessage />
        ) : (
          <ProductListing products={products} />
        )}
      </>
    )}
    </div>
    </>
  );
};

export default Home;
