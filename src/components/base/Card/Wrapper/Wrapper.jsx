// Basics
import React, { PropTypes } from 'react';
import './Wrapper.css';

// Components
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

/*
const VALID_SUBCOMPONENTS = [
  'Body',
  'Title',
  'Actions',
  'Media',
];
*/

const Wrapper = (props) => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  if (children) {
    /*
    const cardChildren = [];
    React.Children.map(children, (child) => {
      // TODO not sure name is reliable in prod... hmmm..
      const hasType = (typeof child.type === 'function'); // divs or whatever would just be 'div'
      const isValidSubcomponent = hasType && VALID_SUBCOMPONENTS.includes(child.type.name);
      if (isValidSubcomponent) cardChildren.push(child);
    });
    */

    return (
      <div {...otherProps} styleName="wrapper" className={`${className} card-wrapper`}>
        {children}
      </div>
    );
  }

  return null;
};

Wrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any, // TODO better proptype..?
  className: PropTypes.string,
};

Wrapper.defaultProps = {
  children: null,
  className: '',
};

export default Wrapper;
