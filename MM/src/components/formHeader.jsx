import React from 'react';
import PropTypes from 'prop-types';

export default function FormHeader({ onClose }) {
  return (
    <>
      <h1 className="modal-title fs-5" id="exampleModalLabel">
        Введите данные
      </h1>
      <button
        type="button"
        className="btn-close category-form-end"
        aria-label="Close"
        onClick={() => onClose(document.querySelector('#addOperationModal'))}
      />
    </>
  );
}
FormHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
};
