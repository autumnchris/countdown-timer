import React from 'react';

const InfoMessage = ({ messageText }) => {
  return <p className="message info-message"><span className="fa-solid fa-circle-info fa-lg fa-fw" aria-hidden="true"></span> {messageText}</p>;
}

export default InfoMessage;