import React from 'react'
import styles from './Loading.module.css'
function Loading() {
  return (
    /* HTML: <div class="loader"></div> */
    <div className={styles.loaderBackground}>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loading