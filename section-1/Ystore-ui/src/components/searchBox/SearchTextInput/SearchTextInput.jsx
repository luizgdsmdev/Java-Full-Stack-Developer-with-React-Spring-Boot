import styles from "../SearchTextInput/SearchTextInput.module.css"

function SearchTextInput({value, onChange}) {
  return (
    <div className={styles.SearchBoxContainer}>
      <input
        id='SearchBoxInputText'
        className={styles.input}
        type="text"
        placeholder="Search for some stickers"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default SearchTextInput;
