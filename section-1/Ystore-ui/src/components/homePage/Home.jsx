// src/components/Home.tsx (ou onde estiver)
import styles from "./Home.module.css";
import PageHeader from "../shared/pageHeader/PageHeader";
import ProductListing from "../products/productListing/productListing";
import Loading from "../shared/loading/Loading";
import Error from "../shared/error/Error";
import NoProductsMessage from "../products/productListing/NoProductsMessage";
// import SearchBox from "../searchBox/SearchTextInput/SearchTextInput"; // Comente se não usar

import { useProducts } from "../../hooks/products/useProducts";

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
      {/* <SearchBox /> */} {/* Descomente se usar */}
      <ProductListing products={products} />
    </div>
  );
};

export default Home;