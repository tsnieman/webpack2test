import React, { PropTypes } from 'react';
import './Home.css';

const Home = () => (
  <div styleName="wrapper">
    <h1>Home page!</h1>
  </div>
);

Home.propTypes = {
  TODO: PropTypes.any,
};

export default Home;