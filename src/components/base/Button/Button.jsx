// Basics
import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/base/Icon';
import styles from './Button.css';

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
    className,
    children,

    // Button-specific
    variant,
    icon,

    // link-specific
    to,

    ...otherProps
  } = props;

  let styleVariant = 'button-default';
  if (VARIANTS.includes(variant)) {
    styleVariant = styles[`button-${variant}`];
  }


  // Depending on props passed, Button might
  // be a `<button>` or `<ReactRouter.Link>`
  const isLink = !!to;
  return isLink ? (
    <Link
      {...otherProps}
      className={`button ${styleVariant} ${className}`}
    >
      {icon && (
        <span className={styles.icon}><Icon icon={icon} /></span>
      )}

      {children && (
        <span className={styles.label}>
          {children}
        </span>
      )}
    </Link>
  ) : (
    <button
      {...otherProps}
      className={`button ${styleVariant} ${className}`}
    >
      {icon && (
        <span className={styles.icon}><Icon icon={icon} /></span>
      )}

      {children && (
        <span className={styles.label}>
          {children}
        </span>
      )}
    </button>
  );
};

Button.propTypes = {
  children: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
  className: React.PropTypes.string,

  // Button-specific
  variant: React.PropTypes.string,
  // disabled: React.PropTypes.bool,
  icon: React.PropTypes.string,

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
  icon: undefined,
};

export default Button;
