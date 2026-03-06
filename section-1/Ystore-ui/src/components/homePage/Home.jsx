import styles from "./Home.module.css";
import PageHeader from "../shared/pageHeader/PageHeader";
import ProductListing from "../products/productListing/ProductListing";
import Loading from "../shared/loading/Loading";
import Error from "../shared/error/Error";
import NoProductsMessage from "../products/productListing/NoProductsMessage";

import { useProducts } from "../../hooks/products/productsQueryFetch";

const Home = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.error("Products fetch went wrong:", error);
    return <Error />;
  }

  if (products.length === 0) {
    return <NoProductsMessage />;
  }

  return (
    <div className={styles.homeContainer}>
      <PageHeader />
      <ProductListing products={products} />
    </div>
  );
};

export default Home;
