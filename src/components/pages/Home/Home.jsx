/* eslint-disable react/no-unescaped-entities */
// TODO what's with this `react/no-unescaped-entities` rule?
import React from 'react';
import './Home.css';

import Button from 'components/base/Button';
import Message from 'components/base/Message';
import { VARIANTS as MESSAGE_VARIANTS } from 'components/base/Message/Wrapper/Wrapper';
import Typography from 'components/Typography';

import reactImage from 'images/reactjs.png';

const Home = ({ createMessage, createErrorMessage }) => (
  <div styleName="wrapper">
    <section>
      <Typography>
        <h1>Home page!</h1>
        <p>(more like kitchen sink)</p>
      </Typography>
    </section>

    <section>
      <Typography>
        <h2>Messages</h2>
        <p>Basic component for displaying small bits of information.</p>
      </Typography>

      <br />

      {MESSAGE_VARIANTS.map(variant => (
        <div styleName="message" key={variant}>
          <Message.Wrapper variant={variant}>
            <Message.Body>
              variant: <code>{variant}</code>
            </Message.Body>
          </Message.Wrapper>
        </div>
      ))}
    </section>

    <section>
      <Typography>
        <h2>"AppMessages" system...</h2>

        <ul>
          <li>Dispatched via redux actions</li>
          <li>Stored in redux store (as an Array)</li>
          <li>When a new AppMessage is added to the store, it will show up in the UI</li>
          <li>Can be dismissed after appearing in the UI</li>
          <li>Have style variations (same as Message style variations)</li>
        </ul>

        <h3>Example uses:</h3>
        <ul>
          <li>Displaying a "we use cookies" message</li>
          <li>Displaying form errors</li>
          <li>
            Displaying errors after failures in sagas (for example: catching request failures)
          </li>
          <li>etc</li>
        </ul>
      </Typography>

      <br />

      <Button
        styleName="create-message-example"
        onClick={() => createMessage('This is an app message!')}
      >Create an app message</Button>

      <Button
        styleName="create-message-example"
        onClick={() => createErrorMessage('This is an app error message!')}
        variant="negative"
      >Create an app error message</Button>
    </section>

    <section>
      <Typography>
        <h2>Images</h2>
        <p>Just imported via <code>file-loader</code>, nothing crazy.</p>
      </Typography>

      <br />

      <img
        src={reactImage}
        alt="react js logo"
        style={{ width: 100 }}
      />
    </section>
  </div>
);

Home.propTypes = {
  // For showing off the app message/error functionality.
  createMessage: React.PropTypes.func.isRequired,
  createErrorMessage: React.PropTypes.func.isRequired,
};

export default Home;
