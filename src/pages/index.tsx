import type { NextPage } from 'next'

import Dummy from 'components/Dummy'
import styles from 'styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>Hello World</h1>
      <Dummy />
    </div>
  )
}

export default Home
