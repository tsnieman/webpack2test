/* eslint-disable global-require, import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './Root';

const app = (
  <AppContainer>
    <Root />
  </AppContainer>
);

const rootEl = document.getElementById('app-index');
ReactDOM.render(app, rootEl);

if (module.hot) {
  module.hot.accept('./Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <Root /> here rather than require() a <NextRoot />.
    // TODO pretty sure I have "ES modules mode" enabled,
    // but just re-using Root doesn't seem to work. Sup?
    const NextRoot = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextRoot />
      </AppContainer>,
      rootEl,
    );
  });
}

export default app;
