import React, { PropTypes } from 'react';

// Routing
import { BrowserRouter, Match, Miss } from 'react-router'

// Declarative webpack code-splitting using Webpack 2 + System.import
import LazyRoute from 'lazy-route';
import Header from 'components/app/Header';

const Root = () => (
  <BrowserRouter>
    <div style={{ color: '#8cc0b7' }}>
      <h1>Hello, World!</h1>

      <Header />

      <Match
        exactly
        pattern="/"
        render={(props) => (
          <LazyRoute
            {...props}
            component={System.import('../pages/Home')}
          />
        )}
      />

      <Match
        exactly
        pattern="/about"
        render={(props) => (
          <LazyRoute
            {...props}
            component={System.import('../pages/About')}
          />
        )}
      />

      <Miss
        render={(props) => (
          <LazyRoute
            {...props}
            component={System.import('../pages/HTTP404')}
          />
        )}
      />
    </div>
  </BrowserRouter>
);

Root.propTypes = {
  TODO: PropTypes.any,
};

export default Root;
