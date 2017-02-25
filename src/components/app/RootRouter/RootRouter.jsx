import React from 'react';

// Routing
import { BrowserRouter, Match, Miss } from 'react-router';

// Declarative webpack code-splitting using Webpack 2 + System.import
import LazilyLoad, { importLazy } from '../../utility/LazilyLoad';

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
            <LazilyLoad
              modules={{
                // TODO remove "System." (only keeping for eslint rn)
                HomePage: () => importLazy(System.import('../../pages/Home')),
              }}
            >
              {({ HomePage }) => (
                <HomePage {...props} />
              )}
            </LazilyLoad>
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
  </BrowserRouter>
);

RootRouter.propTypes = {
};

export default RootRouter;
