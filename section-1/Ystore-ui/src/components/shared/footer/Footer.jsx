import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          &copy; {new Date().getFullYear()} Ystore by{" "}
          <a
            href="https://github.com/luizgdsmdev"
            className={styles.footerLink}
          >
            Luizgdsmdev
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
