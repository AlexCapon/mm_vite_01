import React from 'react';
import PropTypes from 'prop-types';
import { arrowRightIcon } from '../assets/icons';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
import { mainColor } from '../constants/styles';
import { tomorrowInput } from '../utils/formatDate';

export default function DateRangeInput({ dateRange, onPick }) {
  const start = document.querySelector('#dateRangeStart');
  const end = document.querySelector('#dateRangeEnd');

  function handlePick() {
    if (start.value > end.value) {
      end.value = start.value;
    }
    onPick({ startDate: start.value, endDate: end.value });
  }
  function handleAllTime() {
    start.value = '1993-03-24';
    end.value = tomorrowInput();
    onPick({ startDate: start.value, endDate: end.value });
  }
  return (
    <>
      <input
        id="dateRangeStart"
        className="content-justify-end form-control m-1"
        type="date"
        defaultValue={dateRange.startDate}
        onChange={handlePick}
      />
      {arrowRightIcon}
      <input
        id="dateRangeEnd"
        className="content-justify-end form-control m-1"
        type="date"
        defaultValue={dateRange.endDate}
        onChange={handlePick}
      />
      <button
        id="allTimeButton"
        className="badge m-3"
        type="button"
        style={{ backgroundColor: mainColor, borderColor: mainColor }}
        onClick={handleAllTime}
      >
        Всё время
      </button>
    </>
  );
}
DateRangeInput.propTypes = {
  dateRange: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  }).isRequired,
  onPick: PropTypes.func.isRequired,
};
