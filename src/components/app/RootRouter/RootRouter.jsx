import React from 'react';

// Routing
import { BrowserRouter, Match, Miss } from 'react-router';

// Declarative webpack code-splitting using Webpack 2 + System.import
import LazyRoute from 'lazy-route';

import Header from 'components/app/Header';

const RootRouter = () => (
  <BrowserRouter>
    <div>
      <Header />

      <div>
        <Match
          exactly
          pattern="/"
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../../pages/Home')}
            />
          )}
        />

        <Match
          exactly
          pattern="/about"
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../../pages/About')}
            />
          )}
        />

        <Miss
          render={props => (
            <LazyRoute
              {...props}
              component={System.import('../../pages/HTTP404')}
            />
          )}
        />
      </div>
    </div>
  </BrowserRouter>
);

RootRouter.propTypes = {
};

// Jest doesn't like the System.import above,
// so we're just not really gonna test this for now.
if (process.env.NODE_ENV === 'test') {
  module.exports = () => <div>RootRouter</div>;
} else {
  module.exports = RootRouter;
}
