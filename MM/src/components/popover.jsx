import React from 'react';
import PropTypes from 'prop-types';

export default function Popover({ message }) {
  return <span style={{ color: message.color }} id={message.id} hidden>{message.text}</span>;
}
Popover.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
