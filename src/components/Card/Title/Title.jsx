// Basics
import React, { PropTypes } from 'react';
import './Title.css';

// Components
import Typography from 'components/Typography';
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

const Title = (props) => {
  const {
    children,
    className,
  } = props;

  const cleanProps = { ...props };

  if (children) {
    return (
      <Typography {...cleanProps} styleName="wrapper" className={`${className} card-title`}>
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
