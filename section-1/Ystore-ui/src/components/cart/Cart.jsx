import React from "react";
import { motion } from "framer-motion";
import styles from "./Cart.module.css";
import emptyCartImage from "/assets/cart/empty-cart.png";

const containerVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { 
    opacity: 1, 
    x: 0, 
    transition: { staggerChildren: 0.12, delayChildren: 0.05, duration: 0.35 }
  },
  exit: { opacity: 0, x: -40, transition: { duration: 0.35 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 }
};

const Cart = ({ items = [] }) => {
  const isEmpty = items.length === 0;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.cartWrapper}
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >

          {isEmpty ? (
            <div className={styles.emptyCart}>
              <motion.img 
                src={emptyCartImage} 
                alt="Empty cart" 
                variants={itemVariants}
                className={styles.emptyImage}
              />
              <motion.div variants={itemVariants} className={styles.emptyText}>
                <h2>Your cart is empty</h2>
                <p>Add some products to see them here and start shopping!</p>
              </motion.div>
            </div>
          ) : (
            <div className={styles.cartItems}>
              {/* Cart itens map will be displayed here */}
            </div>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default Cart;