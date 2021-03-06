/* global window */
// Kick off the client-side app.
/* eslint-disable global-require, import/no-extraneous-dependencies */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/app/Root';

import 'json/manifest.json';

import * as OfflinePluginRuntime from 'offline-plugin/runtime';

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install({
    onInstalled: function onInstalled() {
      // eslint-disable-next-line no-console
      console.log('OfflinePluginRuntime.onInstalled');
    },
    onUpdateReady: function onUpdateReady() {
      // eslint-disable-next-line no-console
      console.log('OfflinePluginRuntime.onUpdateReady');
    },
    onUpdating: function onUpdating() {
      // eslint-disable-next-line no-console
      console.log('OfflinePluginRuntime.onUpdating');
    },
    onUpdated: function onUpdated() {
      // eslint-disable-next-line no-console
      console.log('OfflinePluginRuntime.onUpdated');
    },
    // onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
    // onUpdated: () => window.swUpdate = true,
  });
}

// Store configuration
import configureStore from 'store/configureStore';

const initialState = {};
const store = configureStore(initialState);

const rootEl = document.getElementById('app-index');

const renderApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,

    // DOM element mounted to
    rootEl,
  );
};

if (module.hot) {
  module.hot.accept('./components/app/Root', () => renderApp());
}

renderApp();
