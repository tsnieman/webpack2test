// Basics
import React, { PropTypes } from 'react';
import './Body.css';

// Components
import Typography from 'components/base/Typography';
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

const Body = (props) => {
  const {
    children,
    className,
  } = props;

  const cleanProps = { ...props };

  if (children) {
    return (
      <Typography {...cleanProps} styleName="wrapper" className={`${className} card-body`}>
        {children}
      </Typography>
    );
  }

  return null;
};

Body.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // TODO better proptype..?
  className: PropTypes.string,
};

Body.defaultProps = {
  children: null,
  className: '',
};

export default Body;
