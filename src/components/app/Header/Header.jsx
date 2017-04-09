import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <strong><Link to="/">🍞 webpack2test</Link></strong>

    <nav>
      <ul>
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
};

export default Header;
