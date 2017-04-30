/* global window */
// Basics
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'actions';
import { lifecycle, compose } from 'recompose';

const ONLINE_MESSAGE_ID = 'online-network-connection';
const OFFLINE_MESSAGE_ID = 'offline-network-connection';

function mapStateToProps() { // (state, ownProps)
  return {
    // PLACEHOLDER
  };
}

function mapDispatchToProps(dispatch) { // (dispatch, ownProps)
  return bindActionCreators({
    createMessage: ({ text, id }) => actions.messages.createMessage({ id, body: text, variant: 'info' }),
    removeMessage: actions.messages.removeMessage,
    // PLACEHOLDER
  }, dispatch);
}

const enhance = compose(
  lifecycle({
    componentDidMount() {
      const {
        createMessage,
        removeMessage,
      } = this.props;

      // Setup network events
      window.addEventListener('offline', () => {
        removeMessage(ONLINE_MESSAGE_ID);
        createMessage({ text: 'Network connection lost', id: OFFLINE_MESSAGE_ID });
      });

      window.addEventListener('online', () => {
        removeMessage(OFFLINE_MESSAGE_ID);
        createMessage({ text: 'Network connection restored', id: ONLINE_MESSAGE_ID });
      });
    },
  }),
);

const NetworkStatusContainer = enhance(() => null);

NetworkStatusContainer.propTypes = {
  createMessage: React.PropTypes.func.isRequired,
  removeMessage: React.PropTypes.func.isRequired,
};

NetworkStatusContainer.defaultProps = {
  // PLACEHOLDER: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(NetworkStatusContainer);
