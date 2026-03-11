import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Login.module.css";

const formContainer = {
  initial: { opacity: 0, x: 40, scale: 0.97, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
      duration: 0.35
    }
  },
  exit: {
    opacity: 0,
    x: -40,
    scale: 0.97,
    filter: "blur(4px)",
    transition: { duration: 0.35 }
  }
};

const formItem = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 }
};

const Login = () => {
  const [mode, setMode] = useState("login");

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Container com stagger para title, texto e form */}
        <motion.div
          variants={formContainer}
          initial="initial"
          animate="animate"
          exit="exit"
        >

          {/* Title animado */}
          <motion.h2 variants={formItem} className={styles.title}>
            {mode === "login" ? "Login" : "Create Account"}
          </motion.h2>

          {/* Texto animado */}
          <motion.p variants={formItem} className={styles.text}>
            {mode === "login"
              ? "Access your account to manage your orders."
              : "Create an account to start shopping."}
          </motion.p>

          {/* Form com AnimatePresence */}
          <div className={styles.formWrapper}>
            <AnimatePresence mode="wait">

              {mode === "login" && (
                <motion.form
                  key="login"
                  className={styles.form}
                  variants={formContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={formItem} className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="john.doe@email.com"
                      required
                      maxLength={100}
                      minLength={10}
                    />
                  </motion.div>

                  <motion.div variants={formItem} className={styles.inputGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Your password"
                      required
                      maxLength={100}
                      minLength={6}
                    />
                  </motion.div>

                  <motion.button variants={formItem} className={styles.primaryButton}>
                    Sign In
                  </motion.button>

                  <motion.a variants={formItem} className={styles.forgot} href="#">
                    Forgot password?
                  </motion.a>

                  <motion.div variants={formItem} className={styles.divider}>
                    <span>or</span>
                  </motion.div>

                  <motion.button
                    variants={formItem}
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => setMode("register")}
                  >
                    Create an account
                  </motion.button>
                </motion.form>
              )}

              {mode === "register" && (
                <motion.form
                  key="register"
                  className={styles.form}
                  variants={formContainer}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <motion.div variants={formItem} className={styles.inputGroup}>
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      required
                      maxLength={100}
                      minLength={3}
                    />
                  </motion.div>

                  <motion.div variants={formItem} className={styles.inputGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="john.doe@email.com"
                      required
                      maxLength={100}
                      minLength={10}
                    />
                  </motion.div>

                  <motion.div variants={formItem} className={styles.inputGroup}>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Your password"
                      required
                      maxLength={100}
                      minLength={6}
                    />
                  </motion.div>

                  <motion.div variants={formItem} className={styles.inputGroup}>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      required
                      maxLength={100}
                      minLength={6}
                    />
                  </motion.div>

                  <motion.button variants={formItem} className={styles.primaryButton}>
                    Create Account
                  </motion.button>

                  <motion.div variants={formItem} className={styles.divider}>
                    <span>or</span>
                  </motion.div>

                  <motion.button
                    variants={formItem}
                    type="button"
                    className={styles.secondaryButton}
                    onClick={() => setMode("login")}
                  >
                    Back to login
                  </motion.button>
                </motion.form>
              )}

            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Login;