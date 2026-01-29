import styles from "./Home.module.css";
import PageHeader from "../shared/pageHeader/PageHeader";
import ProductListing from "../products/productListing/productListing";
import productsMock from "../../data/productsMock.js";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <PageHeader
        title="Explore Ystore stickers"
        subtitle="Add a touch of creativity to your space with our wide range of fun and unique stickers. Perfect for any occasion!"
      />
      <ProductListing products={productsMock} />
    </div>
  );
};

export default Home;
