import React from "react";
import { motion } from "framer-motion";
import styles from "./Contact.module.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0 }
};

const Contact = () => {
  return (
    <section className={styles.section}>
      <motion.div
        className={styles.container}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h2 variants={item} className={styles.title}>
          Contact Us
        </motion.h2>

        <motion.p variants={item} className={styles.text}>
          Have a question, suggestion or just want to say hello?
          Send us a message and we will get back to you as soon as possible.
        </motion.p>

        <motion.form variants={item} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input type="text" placeholder="John Doe" className={styles.inputNameContact} required maxLength={100} minLength={10} />
          </div>

          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="john.doe@email.com" required maxLength={100} minLength={10} />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              required
              maxLength={600}
              minLength={15}
            />
          </div>

          <button className={styles.button}>
            Send Message
          </button>
        </motion.form>

        <motion.p variants={item} className={styles.footerText}>
          We usually respond within 24 hours.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Contact;