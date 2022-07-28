import React from 'react'
import styles from './Loader.module.scss'

function Loader() {
  return (
    <>
      <div className={styles.loader}></div>
      <div className={ styles.loading}>
        <h1>Loading...</h1>
      </div>
    </>
  )
}

export default Loader