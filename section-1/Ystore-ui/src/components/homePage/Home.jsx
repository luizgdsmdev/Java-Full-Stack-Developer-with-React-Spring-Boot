import styles from "./Home.module.css";
import PageHeader from "../shared/pageHeader/PageHeader";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <PageHeader
        title="Explore Ystore stickers"
        subtitle="Add a touch of creativity to your space with our wide range of fun and unique stickers. Perfect for any occasion!"
      />
    </div>
  );
};

export default Home;
