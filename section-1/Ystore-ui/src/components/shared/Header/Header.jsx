import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import ThemeToggle from "./themeToogle/ThemeToggle";
import { useMobileMenu } from "../../../hooks/products/useMobileMenu";
import { faBars, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

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
              <NavLink to="/about" className={({isActive}) =>{
                return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
              }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({isActive}) =>{
                return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
              }}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({isActive}) =>{
                return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
              }}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className={({isActive}) =>{
                return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
              }}>
                <FontAwesomeIcon
                  icon={faShoppingBasket}
                  className={styles.cartIcon}
                />
              </NavLink>
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
