// Kick off the client-side app.
/* eslint-disable global-require, import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/app/Root';

const app = ({ initialLocation }) => (
  <AppContainer>
    <Root initialLocation={initialLocation} />
  </AppContainer>
);

app.propTypes = {
  initialLocation: React.PropTypes.string,
};

app.defaultProps = {
  initialLocation: '/',
};

if (typeof ISOMORPHIC_WEBPACK === 'undefined') {
  const rootEl = document.getElementById('app-index');
  ReactDOM.render(app({ initialLocation: document.pathname }), rootEl);

  // TODO RHL3 for isomorphic setup we use now...
  // console.log({ module: module, mhot: module.hot });
  /*
  if (module.hot) {
    module.hot.accept('./components/app/Root', () => {
      // If you use Webpack 2 in ES modules mode, you can
      // use <Root /> here rather than require() a <NextRoot />.
      // TODO pretty sure I have "ES modules mode" enabled,
      // but just re-using Root doesn't seem to work. Sup?
      const NextRoot = require('./components/app/Root').default;
      ReactDOM.render(
        <AppContainer>
          <NextRoot />
        </AppContainer>,
        rootEl,
      );
    });
  }
  */
}

export default app;
