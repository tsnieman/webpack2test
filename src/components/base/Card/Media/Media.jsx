// Basics
import React, { PropTypes } from 'react';
import './Media.css';

// Components
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

const Media = (props) => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  if (children) {
    return (
      <div {...otherProps} styleName="wrapper" className={`${className} card-media`}>
        {children}
      </div>
    );
  }

  return null;
};

Media.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any, // TODO better proptype..?
  className: PropTypes.string,
};

Media.defaultProps = {
  children: null,
  className: '',
};

export default Media;
