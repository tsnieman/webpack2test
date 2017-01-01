import React, { PropTypes } from 'react';

const Root = () => (
  <div style={{ color: '#8cc0b7' }}>
    <h1>Hello, World!</h1>
  </div>
);

Root.propTypes = {
  TODO: PropTypes.any,
};

export default Root;
