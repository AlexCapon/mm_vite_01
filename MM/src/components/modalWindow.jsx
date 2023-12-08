import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { mainColor } from '../constants/styles';

export default function ModalWindow({
  id, headTitle, children, text, onClose,
}) {
  return (
    <dialog id={id} className="dialog">
      <div id="dialogContent" className="dialog-content">
        <div className="container modal-header">
          <h3>{headTitle}</h3>
          <button
            id="closeButton"
            type="button"
            className="btn-close category-form-end"
            onClick={() => onClose(document.querySelector(`#${id}`))}
            aria-label="Close"
          />
        </div>
        <div id="modalBody" className="container modal-body">
          {cloneElement(children, { id, onClose }) || text}
        </div>
        {text ? (
          <div id="modalFooter" className="container modal-buttons">
            <button
              id="okButton"
              type="button"
              className="btn m-1"
              style={{ backgroundColor: mainColor }}
              onClick={onClose}
              key="submitButton"
            >
              Ок
            </button>
          </div>
        ) : '' }
      </div>
    </dialog>
  );
}
ModalWindow.propTypes = {
  id: PropTypes.string.isRequired,
  headTitle: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object,
  text: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

ModalWindow.defaultProps = {
  children: undefined,
  text: undefined,
};
