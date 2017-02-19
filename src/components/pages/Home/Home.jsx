import React from 'react';
import './Home.css';

import Button from 'components/base/Button';
import Helmet from 'react-helmet';

import reactImage from 'images/reactjs.png';

const Home = () => (
  <div styleName="wrapper">
    <Helmet
      title="Home"
    />

    <h1>Home page!</h1>

    <div>
      <Button variant="positive">Hello</Button>
    </div>

    <img
      src={reactImage}
      alt="react js logo"
    />
  </div>
);

Home.propTypes = {
};

export default Home;
