// Basics
import React from 'react';
import './AppMessages.css';

// Components
import Button from 'components/base/Button';
import Message from 'components/base/Message';

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
      className={`${className} app-messages-wrapper`}
    >
      {messages.map(message => (
        <Message.Wrapper
          key={message.id}
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
      ))}
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
