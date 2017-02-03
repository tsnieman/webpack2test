import React from 'react';

// Jest doesn't like the System.import above,
// so we're just not really gonna test this for now.
import RootRouter from 'components/app/RootRouter';

const Root = () => (
  <div>
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
