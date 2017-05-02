// Basics
import React, { PropTypes } from 'react';
import styles from './Wrapper.css';

// Components
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

/*
const VALID_SUBCOMPONENTS = [
  'Body',
  'Actions',
];
*/

export const VARIANTS = [
  'default',
  'inverse',
  'positive',
  'negative',
  'info', // TODO "info" feels meaningless.
];

const Wrapper = (props) => {
  const {
    children,
    className,
    variant,
    ...otherProps
  } = props;

  let styleVariant = 'message-default';
  if (VARIANTS.includes(variant)) {
    styleVariant = `message-${variant}`;
  }

  if (children) {
    /*
    const messageChildren = [];
    React.Children.map(children, (child) => {
      // TODO not sure displayName is reliable in prod... hmmm..
      const hasType = (typeof child.type === 'function'); // divs or whatever would just be 'div'
      const isValidSubcomponent = hasType && VALID_SUBCOMPONENTS.includes(child.type.displayName);
      if (isValidSubcomponent) messageChildren.push(child);
    });
    */

    const styleName = styles[styleVariant];

    return (
      <div {...otherProps} className={`${styleName} ${className} message-wrapper`}>
        {children}
      </div>
    );
  }

  return null;
};

Wrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired, // TODO proptype?
  className: PropTypes.string,
  variant: PropTypes.string,
};

Wrapper.defaultProps = {
  children: null,
  className: '',
  variant: 'default',
};

export default Wrapper;
