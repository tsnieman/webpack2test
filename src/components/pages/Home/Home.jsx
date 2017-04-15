/* eslint-disable react/no-unescaped-entities */
// TODO what's with this `react/no-unescaped-entities` rule?
import React from 'react';
import './Home.css';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import StarButton from 'components/StarButton';
import Message from 'components/base/Message';
import Icon from 'components/base/Icon';
import { graphics } from 'components/base/Icon/Icon';
import { VARIANTS as MESSAGE_VARIANTS } from 'components/base/Message/Wrapper/Wrapper';
import Typography from 'components/Typography';

import reactImage from 'images/reactjs.png';

const iconList = [];
graphics.forEach((value, key) => iconList.push(key));

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

    <section>
      <Typography>
        <h2>Icons</h2>
        <p>
          Inlined SVGs via an <code>&lt;Icon icon="x" /&gt;</code> component.
          Pretty no-frills.
        </p>
      </Typography>

      <br />

      <ul styleName="icon-list">
        {iconList.map(value => (
          <li key={value}>
            <Icon icon={value} /> <code>{value}</code>
          </li>
        ))}
      </ul>
    </section>

    <section>
      <Typography>
        <h2>Checkbox</h2>
      </Typography>

      <br />

      <Checkbox>Unchecked</Checkbox>

      <br />

      <Checkbox checked>Checked</Checkbox>
    </section>

    <section>
      <Typography>
        <h2>Misc examples</h2>
      </Typography>

      <div>
        <StarButton />
        {' '}
        <StarButton starred />
      </div>

      <Typography>
        <p>
          Testing how Icon looks <Icon icon="info" />
          inline with some typography <Icon icon="info" />
          la la la la la
        </p>
      </Typography>

      <div>
        <Button icon="info">Button[icon]</Button>
        {' '}
        <Button icon="info" />
      </div>

      <br />
      <br />

      <code>font-size: 2em</code>:
      <div styleName="two-x">
        <Button icon="info">Button[icon]</Button>
        {' '}
        <Button icon="info" />
      </div>
    </section>
  </div>
);

Home.propTypes = {
  // For showing off the app message/error functionality.
  createMessage: React.PropTypes.func.isRequired,
  createErrorMessage: React.PropTypes.func.isRequired,
};

export default Home;
