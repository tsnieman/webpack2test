import React, { PropTypes } from 'react';
import { Link } from 'react-router'

const Header = () => (
  <header>
    <h1>webpack2test</h1>

    <nav>
      <ul>
        <li>
          <Link to="/">/home</Link>
        </li>

        <li>
          <Link to="/about">/about</Link>
        </li>

        <li>
          <Link to="/404-fake-route">/404-fake-route</Link>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  TODO: PropTypes.any,
};

export default Header;
