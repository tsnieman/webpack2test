// Basics
import React, { PropTypes } from 'react';
import './Title.css';

// Components
import Typography from 'components/base/Typography';
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

const Title = (props) => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  if (children) {
    return (
      <Typography {...otherProps} styleName="wrapper" className={`${className} card-title`}>
        <span styleName="title-text" className="card-title-text">
          {children}
        </span>
      </Typography>
    );
  }

  return null;
};

Title.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any, // TODO better proptype..?
  className: PropTypes.string,
};

Title.defaultProps = {
  children: null,
  className: '',
};

export default Title;
