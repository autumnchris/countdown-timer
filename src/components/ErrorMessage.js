import React from 'react';

const ErrorMessage = ({ messageText }) => {
  return <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw" aria-hidden="true"></span> {messageText}</p>;
}

export default ErrorMessage;