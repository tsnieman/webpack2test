import React from 'react';
import './Header.css';

import { Link } from 'react-router-dom';

import { PLAINTEXT_NAME } from 'constants/app';

const Header = () => (
  <div>
    <header styleName="wrapper">
      <strong styleName="brand"><Link to="/">{PLAINTEXT_NAME}</Link></strong>

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

    <div styleName="wave" />
  </div>
);

Header.propTypes = {
};

export default Header;
