// Basics
import React, { PropTypes } from 'react';
import styles from './Actions.css';

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

  if (!children) return null;

  const styleName = styles.wrapper;

  return (
    <Typography {...otherProps} className={`${styleName} ${className} card-actions`}>
      {children}
    </Typography>
  );
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
