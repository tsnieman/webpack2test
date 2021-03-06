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
    ...otherProps
  } = props;

  if (children) {
    return (
      <Typography {...otherProps} styleName="wrapper" className={`${className} message-actions`}>
        {children}
      </Typography>
    );
  }

  return null;
};

Actions.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // TODO proptype?
  className: PropTypes.string,
};

Actions.defaultProps = {
  children: null,
  className: '',
};

export default Actions;
