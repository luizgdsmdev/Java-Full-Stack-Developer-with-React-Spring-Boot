import React from 'react'
import styles from './NotFundTextMessage.module.css'
import { NavLink } from 'react-router-dom'

function NotFundTextMessage() {
  return (
    <div className={styles.notFundTextMessageContainer}>
      <h2 className={styles.errorTitle}>Ops... Did you got lost?</h2>
      <p className={styles.errorDescriptionHomeMessage}>Why don't you try go back <NavLink to="/" className={styles.navLink}>home</NavLink></p>
      <p className={styles.errorDescription}>Design by <a href="https://codepen.io/code2rithik/pen/XWpVvYL" target="_blank" rel="noopener noreferrer">codepen.io</a></p>
    </div>
  )
}

export default NotFundTextMessage