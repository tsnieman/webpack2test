/* eslint-disable react/no-unescaped-entities */
// TODO what's with this `react/no-unescaped-entities` rule?
import React from 'react';
import './Home.css';

import Button from 'components/base/Button';

import reactImage from 'images/reactjs.png';

const Home = ({ createMessage, createErrorMessage }) => (
  <div styleName="wrapper">
    <h1>Home page!</h1>

    <hr />

    <p>Testing images:</p>

    <img
      src={reactImage}
      alt="react js logo"
      style={{ width: 100 }}
    />

    <hr />

    <div>
      <h2>Testing "AppMessages" system...</h2>

      <Button
        styleName="create-message-example"
        onClick={() => createMessage('This is an app message!')}
      >Create an app message</Button>

      <Button
        styleName="create-message-example"
        onClick={() => createErrorMessage('This is an app error message!')}
        variant="negative"
      >Create an app error message</Button>
    </div>
  </div>
);

Home.propTypes = {
  // For showing off the app message/error functionality.
  createMessage: React.PropTypes.func.isRequired,
  createErrorMessage: React.PropTypes.func.isRequired,
};

export default Home;
