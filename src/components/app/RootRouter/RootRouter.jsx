import React from 'react';

// Routing
import { StaticRouter, Match, Miss } from 'react-router';

// Declarative webpack code-splitting using Webpack 2 + System.import
import LazilyLoad, { importLazy } from '../../utility/LazilyLoad';

import Header from 'components/app/Header';
import Home from '../../pages/Home';

const RootRouter = ({ initialLocation }) => (
  <StaticRouter location={initialLocation}>
    <div>
      <Header />

      <div>
        <Match
          exactly
          pattern="/"
          component={() => (
            <Home />
          )}
        />

        <Match
          exactly
          pattern="/about"
          render={props => (
            <LazilyLoad
              modules={{
                // TODO remove "System." (only keeping for eslint rn)
                AboutPage: () => importLazy(System.import('../../pages/About')),
              }}
            >
              {({ AboutPage }) => (
                <AboutPage {...props} />
              )}
            </LazilyLoad>
          )}
        />

        <Miss
          render={props => (
            <LazilyLoad
              modules={{
                // TODO remove "System." (only keeping for eslint rn)
                HTTP404Page: () => importLazy(System.import('../../pages/HTTP404')),
              }}
            >
              {({ HTTP404Page }) => (
                <HTTP404Page {...props} />
              )}
            </LazilyLoad>
          )}
        />
      </div>
    </div>
  </StaticRouter>
);

RootRouter.propTypes = {
  initialLocation: React.PropTypes.string,
};

RootRouter.defaultProps = {
  initialLocation: '/',
};

export default RootRouter;
