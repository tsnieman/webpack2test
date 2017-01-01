import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'components/app/Root';
import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('root')

ReactDOM.render(
  <AppContainer>
    <Root />
  </AppContainer>,
  rootEl
);

if (module.hot) {
  module.hot.accept('./components/app/Root', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <Root /> here rather than require() a <NextRoot />.
    const NextRoot = require('./components/app/Root').default;
    ReactDOM.render(
      <AppContainer>
         <NextRoot />
      </AppContainer>,
      rootEl
    );
  });
}
