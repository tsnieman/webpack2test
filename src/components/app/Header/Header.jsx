import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

const Header = () => (
  <header styleName="wrapper">
    <strong styleName="brand"><Link to="/">🍞 webpack2test</Link></strong>

    <nav>
      <ul styleName="nav-items">
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
