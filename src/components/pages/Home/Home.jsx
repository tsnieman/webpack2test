import React from 'react';
import Button from 'components/base/Button';
import './Home.css';

const Home = () => (
  <div styleName="wrapper">
    <h1>Home page!</h1>
    <Button variant="positive">Hello</Button>
  </div>
);

Home.propTypes = {
};

export default Home;
