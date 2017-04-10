/* eslint-disable import/no-webpack-loader-syntax */
// ^ Didn't seem worth it to configure loaders to split pages.

import React from 'react';
import './RootRouter.css';

// Routing
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppMessages from 'containers/app/AppMessages';
import Header from 'components/app/Header';
import HTTP404Page from 'components/pages/HTTP404';

// Declarative webpack code-splitting / component loading
import Bundle from 'components/utility/Bundle';

// Lazy-loading / code-splitting via bundle-loader and Webpack 2
const loadHome = require('bundle-loader?lazy&name=HomePage!../../../containers/pages/Home.jsx');
const loadAbout = require('bundle-loader?lazy&name=AboutPage!../../pages/About/About.jsx');

const RootRouter = () => (
  <BrowserRouter>
    <div>
      <div styleName="messages">
        <AppMessages />
      </div>

      <Header />

      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Bundle load={loadHome}>
                {Home => <Home {...props} />}
              </Bundle>
            )}
          />

          <Route
            exact
            path="/about"
            render={props => (
              <Bundle load={loadAbout}>
                {About => <About {...props} />}
              </Bundle>
            )}
          />

          <Route component={HTTP404Page} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

RootRouter.propTypes = {
  // PLACEHOLDER
};

export default RootRouter;
