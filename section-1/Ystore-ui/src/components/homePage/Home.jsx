import styles from "./Home.module.css";
import PageHeader from "../shared/pageHeader/PageHeader";
import ProductListing from "../products/productListing/ProductListing";
import Loading from "../shared/loading/Loading";
import Error from "../shared/error/Error";
import NoProductsMessage from "../products/productListing/NoProductsMessage";
import { useLoaderData } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { fetchProductsAPI } from "../../API/product/ProductFetch";

const Home = () => {
  // Get initial data from loader
  const initialData = useLoaderData();
  
  // Use React Query for caching and refetching, with initial data from loader
  const { data: products = [], isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductsAPI,
    initialData: initialData,
  });

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