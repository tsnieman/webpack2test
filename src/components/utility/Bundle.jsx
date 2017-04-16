// Copied/modified from https://reacttraining.com/react-router/web/guides/code-splitting
import React from 'react';

class Bundle extends React.Component {
  constructor() {
    super();

    this.state = {
      // short for "module" but that's a keyword in js, so "mod"
      mod: null,
    };
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null,
    });

    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    if (!this.state.mod) return this.props.loading;

    return this.props.children(this.state.mod);
  }
}

Bundle.propTypes = {
  children: React.PropTypes.func.isRequired,
  load: React.PropTypes.func.isRequired,
  loading: React.PropTypes.any, // eslint-disable-line react/forbid-prop-types
};

Bundle.defaultProps = {
  loading: <div>Loading...</div>,
  // PLACEHOLDER
};

export default Bundle;
