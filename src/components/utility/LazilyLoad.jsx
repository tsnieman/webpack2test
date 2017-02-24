// Component code via
// https://webpack.js.org/guides/lazy-load-react/#lazilyload-component

/* eslint consistent-return: 0 */
/* eslint react/prop-types: 0 */
/* eslint react/forbid-prop-types: 0 */
/* eslint no-underscore-dangle: 0 */
import React from 'react';

class LazilyLoad extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.load();
  }

  componentDidUpdate(previous) {
    if (this.props.modules === previous.modules) return null;
    this.load();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  load() {
    this.setState({
      isLoaded: false,
    });

    const { modules } = this.props;
    const keys = Object.keys(modules);

    Promise.all(keys.map(key => modules[key]()))
      .then(values => (keys.reduce((agg, key, index) => ({
        ...agg,
        [key]: values[index],
      }), {})))
      .then((result) => {
        if (!this._isMounted) return null;
        this.setState({ modules: result, isLoaded: true });
      });
  }

  render() {
    if (!this.state.isLoaded) return null;
    return React.Children.only(this.props.children(this.state.modules));
  }
}

LazilyLoad.propTypes = {
  children: React.PropTypes.func.isRequired,
  modules: React.PropTypes.object.isRequired, // TODO shape
};

export const LazilyLoadFactory = (Component, modules) => props => (
  <LazilyLoad modules={modules}>
    {mods => <Component {...mods} {...props} />}
  </LazilyLoad>
  );

export const importLazy = promise => (
  promise.then(result => result.default)
);

export default LazilyLoad;
