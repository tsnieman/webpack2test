import React from 'react';

// Routing
import {
  Route,
  Switch,
} from 'react-router-dom';

let Router;
if (typeof ISOMORPHIC_WEBPACK === 'undefined') {
  Router = require('react-router-dom').BrowserRouter; // eslint-disable-line global-require
} else {
  Router = require('react-router-dom').StaticRouter; // eslint-disable-line global-require
}

// Declarative webpack code-splitting using Webpack 2 + System.import
// import LazilyLoad, { importLazy } from '../../utility/LazilyLoad';

import Header from 'components/app/Header';
import HomePage from 'components/pages/Home';
import AboutPage from 'components/pages/About';
import HTTP404Page from 'components/pages/HTTP404';

const RootRouter = ({ initialLocation }) => (
  <Router location={initialLocation} context={{}}>
    <div>
      <Header />

      <div>
        <Switch>
          {/* A <Switch> renders the first child <Route> that matches.
            A <Route> with no path always matches. */}
          <Route
            exact
            path="/"
            render={() => (
              <HomePage />
            )}
          />

          <Route
            exact
            path="/about"
            render={() => (
              <AboutPage />
            )}
          />

          <Route
            render={() => (
              <HTTP404Page />
            )}
          />
        </Switch>
      </div>
    </div>
  </Router>
);

RootRouter.propTypes = {
  initialLocation: React.PropTypes.string,
};

RootRouter.defaultProps = {
  initialLocation: document.pathname,
};

export default RootRouter;
