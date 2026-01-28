import React from "react";
import styles from "./pageHeader.module.css";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className={styles.pageHeaderContainer}>
      <h3 className={styles.pageTitle}>{title}</h3>
      <p className={styles.pageSubtitle}>{subtitle}</p>
    </div>
  );
};

export default PageHeader;
