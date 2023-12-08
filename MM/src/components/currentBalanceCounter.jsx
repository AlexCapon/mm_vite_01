import React from 'react';
import PropTypes from 'prop-types';

export default function CurretBalnceCounter({ currentBalance }) {
  return <h3 className="">{`Баланс: ${currentBalance}`}</h3>;
}
CurretBalnceCounter.propTypes = {
  currentBalance: PropTypes.number.isRequired,
};
