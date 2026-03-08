import React from 'react'
import Header from '../shared/Header/Header'
import Footer from '../shared/footer/Footer'
import styles from './PageNotFund.module.css'
import SvgComponents from './svgComponents/SvgComponents'
import NotFundTextMessage from './notFundTextMessage/NotFundTextMessage'

function PageNotFund() {
  return (
    <div className={styles.homeContainerNotFundPage }>
    <Header />
    <div className={styles.notFundContentContainer}>
      <SvgComponents />
      <NotFundTextMessage />
    </div>
    <Footer />
    </div>
  )
}

export default PageNotFund