// Basics
import React from 'react';
import styles from './Typography.css';

const Typography = (props) => {
  const {
    children,
    loading,
    className,
    ...otherProps
  } = props;

  // TODO instead of replacing with block char, maybe just use a
  // placeholder font? i.e. Redactor-font/BLOKK
  const content = loading ? children.replace(/[^\s\\]/g, '█') : children;
  const styleModule = loading ? 'wrapper-loading' : 'wrapper';

  return (
    <div {...otherProps} className={`${styles[styleModule]} ${className}`}>
      {content}
    </div>
  );
};

Typography.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: React.PropTypes.any, // TODO proptype...?
  loading: React.PropTypes.bool,
  className: React.PropTypes.string,
};

Typography.defaultProps = {
  className: '',
  children: null,
  loading: false,
};

export default Typography;
