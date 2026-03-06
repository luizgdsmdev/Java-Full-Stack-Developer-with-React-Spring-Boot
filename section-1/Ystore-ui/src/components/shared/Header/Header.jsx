import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import ThemeToggle from "./themeToogle/ThemeToggle";
import { useMobileMenu } from "../../../hooks/products/useMobileMenu";
import { faBars, faWindowClose } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="/" className={styles.link}>
          <FontAwesomeIcon icon={faTags} className={styles.brandIcon} />
          <span className={styles.brandTitle}>Ystore</span>
        </a>

        <button
          className={styles.menuButton}
          onClick={() => {
            toggleMenu();
          }}>
          <FontAwesomeIcon icon={faBars} />
        </button>


        <nav className={`${styles.nav} ${isOpen ? styles.open : ""}`}>
          <ul>
            <li className={styles.menuIconMobile}>
              <div>
                <FontAwesomeIcon icon={faTags} className={styles.brandIcon} />
                <span className={styles.brandTitle}>Ystore</span>
              </div>
              <button
                  className={styles.menuButton}
                  onClick={() => {
                    closeMenu();
                  }}>
                  <FontAwesomeIcon icon={faWindowClose} />
              </button>
            </li>

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
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && (
        <div
          className={`${styles.overlay} ${styles.open}`}
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;
