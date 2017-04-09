import React from 'react';
import './Home.css';

import reactImage from 'images/reactjs.png';

const Home = () => (
  <div styleName="wrapper">
    <h1>Home page!</h1>

    <img
      src={reactImage}
      alt="react js logo"
    />
  </div>
);

Home.propTypes = {
};

export default Home;
