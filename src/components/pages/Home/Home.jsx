import React from 'react';
import styles from './Home.css';

import reactImage from 'images/reactjs.png';

console.log('##########');
console.log('##########');
console.log('##########');
console.log({ styles });
const Home = () => (
  <div>
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
