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
    // TODO added the following line, otherwise was getting errors.
    if (!this.state.mod) return <div>Loading...</div>;

    return this.props.children(this.state.mod);
  }
}

Bundle.propTypes = {
  children: React.PropTypes.func.isRequired,
  load: React.PropTypes.func.isRequired,
};

export default Bundle;
