import React, { PropTypes } from 'react';

// Routing
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import HomePage from 'components/pages/Home'
import AboutPage from 'components/pages/About'

const Root = () => (
  <BrowserRouter>
    <div style={{ color: '#8cc0b7' }}>
      <h1>Hello, World!</h1>

      <nav>
        <ul>
          <li>
            <Link to="/">/home</Link>
          </li>

          <li>
            <Link to="/about">/about</Link>
          </li>
        </ul>
      </nav>

      <Match exactly pattern="/" component={HomePage} />

      <Match exactly pattern="/about" component={AboutPage} />

      <Miss
        component={() => {
          <div>404!</div>
        }}
      />
    </div>
  </BrowserRouter>
);

Root.propTypes = {
  TODO: PropTypes.any,
};

export default Root;
