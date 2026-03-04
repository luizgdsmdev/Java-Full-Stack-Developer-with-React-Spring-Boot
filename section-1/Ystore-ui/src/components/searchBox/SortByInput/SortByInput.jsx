import styles from "../SortByInput/SortByInput.module.css"
function SortByInput({ value, onChange }) {
   return (
    <div className={styles.sortContainer}>
      <select
        id="sort"
        className={styles.sortSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="popularity">Popularity</option>
        <option value="price-asc">Lowest price</option>
        <option value="price-desc">Highest price</option>
      </select>
    </div>
  );
}

export default SortByInput;