// Basics
import React from 'react';
import './GithubUser.css';

// Components
import Typography from 'components/base/Typography';
import Card from 'components/base/Card';
// import Icon from 'components/Icon';
// import { Link } from 'react-router';

const GithubUser = ({ user, loading }) => {
  // TODO DRY-er.
  if (loading) {
    return (
      <Card.Wrapper styleName="wrapper">
        <Card.Media>
          {/* TODO loader/spinner */}
          <img
            src="http://placehold.it/350x350?text=Loading"
            alt="placeholder avatar while loading"
          />
        </Card.Media>

        <Card.Title>
          <Typography loading>
            @Username
          </Typography>
        </Card.Title>

        <Card.Body>
          <dl>
            <dt>followers</dt>
            <dd>
              <Typography loading>
                ###
              </Typography>
            </dd>

            <dt>following</dt>
            <dd>
              <Typography loading>
                ###
              </Typography>
            </dd>
          </dl>
        </Card.Body>
      </Card.Wrapper>
    );
  }

  // Not loading and user still not present?
  // Something went wrong.
  if (!user) {
    return (
      <Card.Wrapper styleName="wrapper">
        <Card.Body>
          Github user could not be loaded.
        </Card.Body>
      </Card.Wrapper>
    );
  }


  return (
    <Card.Wrapper styleName="wrapper">
      <Card.Media>
        <img
          src={user.avatarUrl}
          alt={`github user @${user.login}'s avatar`}
        />
      </Card.Media>

      <Card.Title>
        <a
          href={`https://github.com/${user.login}`}
          target="_blank"
          rel="noopener noreferrer"
        >@{user.name}</a>
      </Card.Title>

      <Card.Body>
        <dl>
          <dt>followers</dt>
          <dd>{user.followers}</dd>

          <dt>following</dt>
          <dd>{user.following}</dd>
        </dl>
      </Card.Body>
    </Card.Wrapper>
  );
};

GithubUser.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: React.PropTypes.object, // TODO shape
  loading: React.PropTypes.bool,
};

GithubUser.defaultProps = {
  user: null,
  loading: false,
};

export default GithubUser;
