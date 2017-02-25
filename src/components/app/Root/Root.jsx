import React from 'react';

import Helmet from 'react-helmet';
import RootRouter from '../RootRouter';

import {
  PLAINTEXT_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
} from '../../../constants/app';

const Root = () => (
  <div>
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
        target: '_blank',
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
);

Root.propTypes = {
};

export default Root;
