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
    ...otherProps
  } = props;

  if (children) {
    return (
      <Typography {...otherProps} styleName="wrapper" className={`${className} message-body`}>
        {/* <Icon icon="info" styleName="icon" /> */}
        {children}
      </Typography>
    );
  }

  return null;
};

Body.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // TODO proptype?
  className: PropTypes.string,
};

Body.defaultProps = {
  children: null,
  className: '',
};

export default Body;
