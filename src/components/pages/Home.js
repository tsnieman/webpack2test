import React, { PropTypes } from 'react';
import styles from './Home.css';

const Home = () => (
  <div className={styles.wrapper}>
    <h1>Home page!</h1>
  </div>
);

Home.propTypes = {
  TODO: PropTypes.any,
};

export default Home;
