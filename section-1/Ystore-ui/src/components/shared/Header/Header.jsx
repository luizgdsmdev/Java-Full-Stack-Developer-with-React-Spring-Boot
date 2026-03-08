import { faShoppingBasket, faTags } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";
import ThemeToggle from "./themeToogle/ThemeToggle";
import { useMobileMenu } from "../../../hooks/products/useMobileMenu";
import { faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { isOpen, isClosing, toggleMenu, closeMenu } = useMobileMenu();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.link}>
          <FontAwesomeIcon icon={faTags} className={styles.brandIcon} />
          <span className={styles.brandTitle}>Ystore</span>
        </NavLink>

        <button
          className={styles.menuButton}
          onClick={() => {
            toggleMenu();
          }}>
          <FontAwesomeIcon icon={faBars} />
        </button>


        <nav className={`${styles.nav} ${isOpen ? styles.open : ""} ${isClosing ? styles.close : ""}`}>
          <ul>
            <li className={styles.menuIconMobile}>
              <div className={styles.menuIconContainer}>
                <div>
                  <FontAwesomeIcon icon={faTags} className={styles.brandIcon} />
                  <span className={styles.brandTitle}>Ystore</span>
                </div>
                <button
                    className={styles.buttonCloseMenuMobile}
                    onClick={() => {
                      closeMenu();
                    }}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/about" className={({isActive}) =>{
                return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
              }}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/contact" className={({isActive}) =>{
                return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
              }}>
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/login" className={({isActive}) =>{
                return isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;
              }}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeMenu} to="/cart" className={({isActive}) =>{
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
      {(isOpen || isClosing) && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.open : ""} ${isClosing ? styles.close : ""}`}
          onClick={closeMenu}
        />
      )}
    </header>
  );
};

export default Header;
