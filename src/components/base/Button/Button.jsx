// Basics
import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

// Components
// import Icon from 'components/Icon';

// TODO build the route helper into this? overkill?

export const VARIANTS = [
  'default',
  'inverse',
  'positive',
  'negative',
];

const Button = (props) => {
  const {
    children,

    // Button-specific
    variant,

    // link-specific
    to,
  } = props;

  let styleVariant = 'button-default';
  if (VARIANTS.includes(variant)) {
    styleVariant = `button-${variant}`;
  }

  const cleanProps = {
    ...props,
  };
  delete cleanProps.variant; // Button-specific


  // Depending on props passed, Button might
  // be a `<button>` or `<ReactRouter.Link>`
  const isLink = !!to;
  return isLink ? (
    <Link
      {...cleanProps}
      styleName={styleVariant}
    >
      {children}
    </Link>
  ) : (
    <button
      {...cleanProps}
      styleName={styleVariant}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types

  // Button-specific
  variant: React.PropTypes.string,
  // disabled: React.PropTypes.bool,

  // link-specific
  to: React.PropTypes.string,
  // href: PropTypes.string,
};

Button.defaultProps = {
  children: '',
  className: '',

  // Button-specific
  disabled: false,
  variant: 'default',
  to: undefined,
};

export default Button;
