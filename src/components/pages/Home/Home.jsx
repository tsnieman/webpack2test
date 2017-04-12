/* eslint-disable react/no-unescaped-entities */
// TODO what's with this `react/no-unescaped-entities` rule?
import React from 'react';
import './Home.css';

import Button from 'components/base/Button';
import Message from 'components/base/Message';
import { VARIANTS as MESSAGE_VARIANTS } from 'components/base/Message/Wrapper/Wrapper';

import reactImage from 'images/reactjs.png';

const Home = ({ createMessage, createErrorMessage }) => (
  <div styleName="wrapper">
    <h1>Home page!</h1>
    <p>(more like kitchen sink)</p>

    <hr />

    <section>
      <h2>Messages</h2>

      {MESSAGE_VARIANTS.map(variant => (
        <Message.Wrapper variant={variant} key={variant}>
          <Message.Body>
            variant: <code>{variant}</code>
          </Message.Body>
        </Message.Wrapper>
      ))}
    </section>

    <hr />

    <section>
      <h2>Images</h2>

      <img
        src={reactImage}
        alt="react js logo"
        style={{ width: 100 }}
      />
    </section>

    <hr />

    <div>
      <h2>"AppMessages" system...</h2>
      <p>Dispatch actions (or catch errors in sagas!) for a site-wide messaging system.</p>
      <p>TODO: better explanation.</p>

      <Button
        styleName="create-message-example"
        onClick={() => createMessage('This is an app message!')}
      >Create an app message</Button>

      <Button
        styleName="create-message-example"
        onClick={() => createErrorMessage('This is an app error message!')}
        variant="negative"
      >Create an app error message</Button>
    </div>
  </div>
);

Home.propTypes = {
  // For showing off the app message/error functionality.
  createMessage: React.PropTypes.func.isRequired,
  createErrorMessage: React.PropTypes.func.isRequired,
};

export default Home;
