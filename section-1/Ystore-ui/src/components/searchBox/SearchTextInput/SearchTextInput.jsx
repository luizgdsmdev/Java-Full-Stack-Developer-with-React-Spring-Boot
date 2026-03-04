import React from 'react'
import styles from "../SearchTextInput/SearchTextInput.module.css"

function SearchTextInput({placeholder, value, onChange}) {
  return (
    <div className={styles.SearchBoxContainer}>
      <input id='SearchBoxInputText' className={styles.input} type="text" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  )
}

export default SearchTextInput;
