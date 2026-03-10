import React from "react";
import { motion } from "framer-motion";
import styles from "./AboutPage.module.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

const AboutPage = () => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h2 variants={item} className={styles.title}>
          About Ystore
        </motion.h2>

        <motion.p variants={item} className={styles.text}>
          The Ystore was born in 2022, in a small room full of ideas,
          coffee and an open notebook full of sketches.
        </motion.p>

        <motion.p variants={item} className={styles.text}>
          Since then, we've transformed this small idea into a collection full
          of personality.
        </motion.p>

        <div className={styles.features}>
          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className={styles.featureCard}
          >
            <h3>⭐ High Quality</h3>
            <p>
              Our stickers are printed on resistant materials,
              durable and with vibrant colors.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className={styles.featureCard}
          >
            <h3>🎨 Big Variety</h3>
            <p>
              Designs for all tastes: minimalists, geeks,
              fun, artistic and more.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            whileHover={{ scale: 1.05 }}
            className={styles.featureCard}
          >
            <h3>💡 Creativity</h3>
            <p>
              New designs are added regularly bringing
              creative ideas.
            </p>
          </motion.div>
        </div>

        <motion.p variants={item} className={styles.footerText}>
          Our mission: transform small ideas into stickers that help
          you express your personality.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default AboutPage;