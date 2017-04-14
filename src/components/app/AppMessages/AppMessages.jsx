// Basics
import React from 'react';
import './AppMessages.css';

// Components
import Button from 'components/base/Button';
import Message from 'components/base/Message';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const AppMessages = (props) => {
  const {
    className,
    messages,
    removeMessage,
  } = props;

  // const hasMessages = (messages && messages.length > 0);
  // if (!hasMessages) return null;

  const cleanProps = { ...props };
  delete cleanProps.messages; // AppMessages-specific
  delete cleanProps.removeMessage; // AppMessages-specific

  return (
    <div
      {...cleanProps}
      styleName="wrapper"
      className={`${className} app-messages-wrapper`}
    >
      <CSSTransitionGroup
        transitionName="app-message-transition"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={300}
      >
        {messages.map(message => (
          <div
            styleName="message"
            key={message.id}
          >
            <Message.Wrapper
              variant={message.variant || 'default'}
            >
              <Message.Body>
                {message.body}
              </Message.Body>

              <Message.Actions>
                <Button
                  onClick={() => removeMessage(message.id)}
                >Dismiss</Button>
              </Message.Actions>
            </Message.Wrapper>
          </div>
        ))}
      </CSSTransitionGroup>
    </div>
  );
};

AppMessages.propTypes = {
  className: React.PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  messages: React.PropTypes.array, // TODO shape
  removeMessage: React.PropTypes.func.isRequired,
};

AppMessages.defaultProps = {
  className: '',
  messages: [],
};

export default AppMessages;
