import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.link}>
          <FontAwesomeIcon icon={faTags} className={styles.brandIcon} />
          <span className={styles.brandTitle}>Ystore</span>
        </a>
        <nav className={styles.nav}>
          <ul>
            <li>
              <a href="/home" className={styles.navLink}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" className={styles.navLink}>
                About
              </a>
            </li>
            <li>
              <a href="/contact" className={styles.navLink}>
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className={styles.navLink}>
                Login
              </a>
            </li>
            <li>
              <a href="/cart" className={styles.navLink}>
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className={styles.cartIcon}
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
