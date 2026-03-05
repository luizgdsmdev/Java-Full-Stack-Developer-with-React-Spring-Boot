import styles from "../SortByInput/SortByInput.module.css"
function SortByInput({ value, onChange }) {
   return (
    <div className={styles.sortContainer}>
      <select
        id="SortByInputSelect"
        className={styles.sortSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="popularity">Popularity</option>
        <option value="asc">Lowest price</option>
        <option value="desc">Highest price</option>
      </select>
    </div>
  );
}

export default SortByInput;