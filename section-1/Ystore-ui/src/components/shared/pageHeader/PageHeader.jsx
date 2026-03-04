import React from "react";
import styles from "./pageHeader.module.css";

const PageHeader = () => {
  return (
    <div className={styles.pageHeaderContainer}>
      <h3 className={styles.pageTitle}>Explore Ystore stickers</h3>
      <p className={styles.pageSubtitle}>Add a touch of creativity to your space with our wide range of fun and unique stickers. Perfect for any occasion!</p>
    </div>
  );
};

export default PageHeader;
