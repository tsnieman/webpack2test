// Basics
import React from 'react';
import styles from './Typography.css';

const Typography = (props) => {
  const {
    children,
    loading,
  } = props;

  const cleanProps = { ...props };
  delete cleanProps.loading; // Typography-specific

  // TODO instead of replacing with block char, maybe just use a
  // placeholder font? i.e. Redactor-font/BLOKK
  const content = loading ? children.replace(/[^\s\\]/g, '█') : children;
  const styleModule = loading ? 'wrapper-loading' : 'wrapper';

  return (
    <div {...cleanProps} className={`${styles[styleModule]} ${cleanProps.className}`}>
      {content}
    </div>
  );
};

Typography.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: React.PropTypes.any, // TODO proptype...?
  loading: React.PropTypes.bool,
};

Typography.defaultProps = {
  children: null,
  loading: false,
};

export default Typography;
