import React from 'react';

import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import RootRouter from 'components/app/RootRouter';

import DevTools from 'containers/DevTools';

import {
  PLAINTEXT_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from 'constants/app';

import '../../../styles/_reset.css';
import '../../../styles/_typography.css';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      {process.env.NODE_ENV === 'development' && (<DevTools />)}

      <Helmet
        htmlAttributes={{
          lang: 'en',
          amp: undefined,
        }}
        titleTemplate={`%s - ${DEFAULT_TITLE}`}
        defaultTitle={DEFAULT_TITLE}
        titleAttributes={{
          itemprop: 'name',
          lang: 'en',
        }}
        base={{
          href: '/',
        }}
        meta={[
          {
            name: `${PLAINTEXT_NAME} description`,
            content: DEFAULT_DESCRIPTION,
          },

          {
            property: 'og:type',
            content: 'article',
          },
        ]}
        link={[
          {
            rel: 'canonical',
            href: '/example',
          },

          {
            rel: 'apple-touch-icon',
            href: '/img/apple-touch-icon-57x57.png',
          },

          {
            rel: 'apple-touch-icon',
            sizes: '72x72',
            href: '/img/apple-touch-icon-72x72.png',
          },
        ]}
      />

      {/* Jest doesn't like the System.import (used in RootRouter),
      so we're just not really gonna test RootRouter for now (TODO) */}
      {(process.env.NODE_ENV === 'test') ? (
        <div>RootRouter</div>
      ) : (
        <RootRouter />
      )}
    </div>
  </Provider>
);

Root.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: React.PropTypes.object.isRequired, // TODO shape ? it's a redux store...
  // PLACEHOLDER
};

Root.defaultProps = {
  store: null,
  // PLACEHOLDER
};

export default Root;
