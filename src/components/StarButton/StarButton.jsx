// Basics
import React, { PropTypes } from 'react';
import './StarButton.css';
import { withState } from 'recompose';

// Components
import Button from 'components/base/Button';

const enhance = withState('starred', 'setStarred', props => props.starred);
const StarButton = enhance((props) => {
  const {
    starred,
    setStarred,
    ...otherProps
  } = props;

  const toggleStar = () => setStarred(n => !n);

  const icon = starred ? 'star' : 'star-outline';
  const label = starred ? 'Starred' : 'Non-starred';

  return (
    <Button
      {...otherProps}
      icon={icon}
      onClick={toggleStar}
      styleName="button"
      data-starred={starred}
    >{label}</Button>
  );
});

StarButton.propTypes = {
  starred: PropTypes.bool,
  setStarred: PropTypes.func,
};

StarButton.defaultProps = {
  starred: false,
};

export default StarButton;
