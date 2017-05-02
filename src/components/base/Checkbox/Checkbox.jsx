/* eslint-disable jsx-a11y/no-static-element-interactions */

// Basics
import React, { PropTypes } from 'react';
import './Checkbox.css';

// Components
import Icon from 'components/base/Icon';

class Checkbox extends React.Component {
  constructor(props) {
    super();

    this.state = {
      checked: !!props.checked,
    };

    // so value can be got via ref
    this.value = this.state.checked;

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  toggleCheck() {
    const checked = !this.state.checked;

    this.setState({ checked });
    this.value = checked;
  }

  render() {
    const {
      children,
      ...otherProps
    } = this.props;

    const {
      checked,
    } = this.state;

    const icon = checked ? 'check-box' : 'check-box-outline-blank';

    // TODO TYLER MAKE SURE YOU DIDNT BREAK THIS IN LINTING (div -> input)
    // SINCE LINTING STOPS COMPILATION....
    // TODO MAYBE SEPARATE LINTING FROM COMPLIATION.
    // PLAIN ESLINT WHEN APP IS RUNNING? NEW NPM CMD? IDK WELL SEE! STAY TUNED FOLKS.
    return (
      <div
        {...otherProps}
        type="button"
        styleName="wrapper"
        onClick={this.toggleCheck}
        data-checked={checked}
      >
        <span styleName="icon"><Icon icon={icon} /></span> {children}
      </div>
    );
  }
}

Checkbox.propTypes = {
  children: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  checked: PropTypes.bool,
};

Checkbox.defaultProps = {
  children: null,
  checked: false,
};

export default Checkbox;

/* eslint-enable jsx-a11y/no-static-element-interactions */
