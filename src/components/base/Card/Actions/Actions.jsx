// Basics
import React, { PropTypes } from 'react';
import './Actions.css';

// Components
import Typography from 'components/base/Typography';
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

const Actions = (props) => {
  const {
    children,
    className,
  } = props;

  const cleanProps = { ...props };

  if (children) {
    return (
      <Typography {...cleanProps} styleName="wrapper" className={`${className} card-actions`}>
        {children}
      </Typography>
    );
  }

  return null;
};

Actions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // TODO better proptype..?
  className: PropTypes.string,
};

Actions.defaultProps = {
  children: null,
  className: '',
};

export default Actions;
