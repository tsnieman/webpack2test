/* eslint-disable react/no-unescaped-entities */
// TODO what's with this `react/no-unescaped-entities` rule?
import React from 'react';
import './About.css';

import Message from 'components/base/Message';
import Typography from 'components/base/Typography';
import GithubUser from 'containers/GithubUser';

import { PLAINTEXT_NAME } from 'constants/app';

const About = () => (
  <div styleName="wrapper">
    <Typography>
      <h1>About {PLAINTEXT_NAME}</h1>
      <h2>Contributors</h2>
      <p>Also a good chance to just use some APIs to build some test fetching/loading/whatever.</p>
    </Typography>

    <br />

    <ul>
      <li styleName="human">
        <GithubUser username="tsnieman" />
      </li>

      <li styleName="human">
        <GithubUser username="definitelyafakeuserwithaloginthatistoolong" />
      </li>
    </ul>

    <br />

    <Message.Wrapper variant="info">
      <Message.Body>
        Note: loading intentionally delayed (less than 2 seconds) to show off the
        fancy loading effect.
      </Message.Body>
    </Message.Wrapper>

    <br />

    <Message.Wrapper variant="info">
      <Message.Body>
        Note: also one of the 'humans' in the list is a fake github username to
        show a failure-handling state. This is mostly to see how smooth I can
        make failure.
      </Message.Body>
    </Message.Wrapper>
  </div>
);

About.propTypes = {
};

export default About;
