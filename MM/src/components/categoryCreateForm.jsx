import React from 'react';
import PropTypes from 'prop-types';
// API
// Константы
import { errorColor, mainColor, secondaryColor } from '../constants/styles';
// Утилиты
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
import isCategoryExist from '../utils/isCategoryExist';
import showErrorMessage from '../utils/showErrorMessage';
import flashInvalidInputs from '../utils/flashInvalidInputs';

export default function CategoryCreateForm({ onSubmit, onSwitch }) {
  const errorMessage = 'Категория с таким названием уже существует';
  return (
    <form className="dialog" id="categoryCreateForm">
      <div id="inputsContainer" className="d-flex">
        <label
          id="categoryNameLabel"
          className="m-1 form-label"
          htmlFor="categoryNameInput"
        >
          Название
          <input id="categoryNameInput" type="text" className="form-control" />
        </label>
        <label
          id="colorLabel"
          className="m-1 form-label"
          htmlFor="colorInput"
        >
          Цвет
          <input id="categoryColorInput" type="color" className="form-control form-control-color" />
        </label>
      </div>
      <div id="incomeSwitchContainer" className="form-check form-switch">
        <label
          id="incomeCheckboxLabel"
          className="m-1 form-label"
          htmlFor="incomeCheckbox"
        >
          <input id="categoryIncomeCheckbox" className="form-switch form-check-input" type="checkbox" role="switch" />
          Доход
        </label>
      </div>
      <div id="buttonContainer" className="button-container">
        <button
          id="cancelCreateCategoryButton"
          className="btn btn-secondary m-1"
          onClick={() => onSwitch(
            document.querySelector('#createCategory'),
            document.querySelector('#addOperation'),
          )}
          type="button"
          style={{ backgroundColor: secondaryColor }}
        >
          Отмена
        </button>
        <button
          id="createCategoryButton"
          className="btn m-1"
          type="button"
          style={{ backgroundColor: mainColor }}
          onClick={() => {
            const form = document.querySelector('#categoryCreateForm');
            const nameInput = form.querySelector('#categoryNameInput');
            const colorInput = form.querySelector('#categoryColorInput');
            const incomeCheckbox = form.querySelector('#categoryIncomeCheckbox');

            if (nameInput.value && colorInput.value && incomeCheckbox.value) {
              if (isCategoryExist(nameInput.value)) {
                showErrorMessage(document.querySelector('#categoryCreateError'));
              } else {
                onSubmit(nameInput, colorInput, incomeCheckbox);
              }
            } else {
              flashInvalidInputs(nameInput, colorInput, incomeCheckbox);
            }
          }}
        >
          Создать
        </button>
      </div>
      <span style={{ color: errorColor }} id="categoryCreateError" hidden>
        {errorMessage}
      </span>
    </form>
  );
}
CategoryCreateForm.propTypes = {
  onSwitch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
