import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Login.module.css";

const formAnimation = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
  transition: { duration: 0.35 }
};

const Login = () => {
  const [mode, setMode] = useState("login");

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <h2 className={styles.title}>
          {mode === "login" ? "Login" : "Create Account"}
        </h2>

        <p className={styles.text}>
          {mode === "login"
            ? "Access your account to manage your orders."
            : "Create an account to start shopping."}
        </p>

        <div className={styles.formWrapper}>

          <AnimatePresence mode="wait">

            {mode === "login" && (
              <motion.form
                key="login"
                className={styles.form}
                {...formAnimation}
              >

                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="john.doe@email.com" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Password</label>
                  <input type="password" placeholder="Your password" required />
                </div>

                <button className={styles.primaryButton}>
                  Sign In
                </button>

                <a className={styles.forgot} href="#">
                  Forgot password?
                </a>

                <div className={styles.divider}>
                  <span>or</span>
                </div>

                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setMode("register")}
                >
                  Create an account
                </button>

              </motion.form>
            )}

            {mode === "register" && (
              <motion.form
                key="register"
                className={styles.form}
                {...formAnimation}
              >

                <div className={styles.inputGroup}>
                  <label>Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="john.doe@email.com" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Password</label>
                  <input type="password" placeholder="Your password" required />
                </div>

                <div className={styles.inputGroup}>
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Confirm password" required />
                </div>

                <button className={styles.primaryButton}>
                  Create Account
                </button>

                <div className={styles.divider}>
                  <span>or</span>
                </div>

                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={() => setMode("login")}
                >
                  Back to login
                </button>

              </motion.form>
            )}

          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Login;