import React from 'react'
import styles from './Error.module.css'
function Error() {
  return (
    <div>
      <div className={styles.errorContainer}>
        <h2>Something went wrong</h2>
        <p>We're sorry, but something went wrong. Please try again later.</p>
      </div>
    </div>
  )
}

export default Error
