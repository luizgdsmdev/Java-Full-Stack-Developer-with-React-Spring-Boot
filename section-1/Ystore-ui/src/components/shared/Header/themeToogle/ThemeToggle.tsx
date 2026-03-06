import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";
import { useTheme } from "../../../../hooks/products/useTheme";

function ThemeToggle() {
const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme} 
      className={styles.ThemeToggle}
    >
      {theme === "dark" ? <Sun size={22}/> : <Moon size={22}/>}
    </button>
  )
}

export default ThemeToggle