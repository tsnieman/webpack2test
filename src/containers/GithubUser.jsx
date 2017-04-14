// Basics
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'actions';

// Components
import GithubUser from 'components/GithubUser';

// TODO use recompose? lifecycle() + withState()?
class GithubUserContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      isFetching: true,
      error: null,

      // Fetch by username but normalize/store by id
      userId: null,
    };
  }

  // TODO if the component unmounts before the
  // getUser action finishes (i.e. a situation like
  // going to a different page), you'll get a warning
  // in the browser console. how to avoid? does it matter enough?
  // relevant: https://facebook.github.io/react/blog/2015/12/16/ismounted-antipattern.html
  componentDidMount() {
    // Get user if not provided (i.e. not in store).
    if (!this.props.user) {
      this.props.getUser(this.props.username, {
        // TODO onFailure/onSuccess set local state.loading = false
        onSuccess: (fetchedUser) => {
          // console.log('onSuccess!', { fetchedUser }); // eslint-disable-line no-console
          this.setState({
            isFetching: false,
            userId: fetchedUser.id,
          });
        },

        onFailure: (error) => {
          // console.log('onFailure!', { error }); // eslint-disable-line no-console
          this.setState({
            isFetching: false,
            error,
          });
        },

        // Log action errors in AppMessages.
        errorMessage: true,
      });
    }
  }

  render() {
    const {
      user: passedUser,
    } = this.props;

    // Prefer passed user. (TODO good default?)
    const user = passedUser || this.props.users[this.state.userId];

    if (!user) {
      const hasError = !!this.state.error;
      const isLoading = (!user || this.state.isFetching) && !hasError;

      return (
        <GithubUser
          loading={isLoading}
        />
      );
    }

    return (
      <GithubUser
        user={user}
      />
    );
  }
}

GithubUserContainer.propTypes = {
  getUser: React.PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  user: React.PropTypes.object, // TODO shape
  username: React.PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  users: React.PropTypes.object, // TODO shape
};

GithubUserContainer.defaultProps = {
  user: null,
  users: {},
};

function mapStateToProps(state, ownProps) { // (state, ownProps)
  return {
    user: ownProps.user, // || state.entities.users[ownProps.username],
    users: state.entities.users,
  };
}

function mapDispatchToProps(dispatch) { // (dispatch, ownProps)
  return bindActionCreators({
    getUser: actions.github.getUser,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserContainer);
