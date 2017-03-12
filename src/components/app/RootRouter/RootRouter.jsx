import React from 'react';

// Routing
import {
  Route,
  StaticRouter as Router,
  Switch,
} from 'react-router-dom';

// Declarative webpack code-splitting using Webpack 2 + System.import
// import LazilyLoad, { importLazy } from '../../utility/LazilyLoad';

import Header from 'components/app/Header';
import Home from 'components/pages/Home';

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
              <div>
                Home page

                <Home />
              </div>
            )}
          />

          <Route
            exact
            path="/about"
            render={() => (
              <div>
                About page
              </div>
            )}
          />

          <Route
            render={() => (
              <div>
                404 page
              </div>
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
  initialLocation: '/',
};

export default RootRouter;
