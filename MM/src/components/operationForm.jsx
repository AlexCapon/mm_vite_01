/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
// Коннстранты
import { errorColor, mainColor } from '../constants/styles';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
import { todayInput } from '../utils/formatDate';
import showErrorMessage from '../utils/showErrorMessage';
import isCategoryExist from '../utils/isCategoryExist';
import flashInvalidInputs from '../utils/flashInvalidInputs';

export default function OperationForm({
  categories,
  onSubmit,
  onClose,
  onSwitch,
  id,
  inputValues,
}) {
  const errorMessage = 'Такой категории не сущетсвует, создайте её';

  return (
    <form id={`${id}Form`} className="form">
      <label htmlFor={`nameInput_${id}`} className="m-1 form-label">
        Название
        <input
          id={`nameInput_${id}`}
          key={`${Date.now()}N`}
          type="text"
          className="form-control"
          defaultValue={inputValues.name}
        />
      </label>
      <label htmlFor={`amountInput_${id}`} className="m-1 form-label">
        Сумма
        <input
          id={`amountInput_${id}`}
          key={`${Date.now()}A`}
          type="number"
          className="form-control"
          defaultValue={inputValues.amount}
        />
      </label>
      <label htmlFor={`categoryInput_${id}`} className="m-1 form-label">
        Категория
      </label>
      <div id="categoryAndDateContainer" className="d-flex">
        <input
          id={`categoryInput_${id}`}
          key={`${Date.now()}C`}
          list={`categorySelect_${id}`}
          className="form-control m-1"
          placeholder="Выберете категорию"
          defaultValue={inputValues.category}
          onChange={(event) => {
            if (event.target.value === '+ Создать категорию') {
              event.target.value = '';
              onSwitch(
                document.querySelector(`#${id}`),
                document.querySelector('#createCategory'),
              );
            }
          }}
        />
        <datalist id={`categorySelect_${id}`} className="m-1">
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
          <option value="+ Создать категорию">+ Создать категорию</option>
        </datalist>
        <input
          id={`dateInput_${id}`}
          key={`${Date.now()}D`}
          type="date"
          defaultValue={inputValues?.date}
          className="form-control m-1"
        />
      </div>
      <div id="buttonsСontainer">
        <button
          className="btn btn-secondary m-1"
          type="button"
          onClick={() => onClose(document.querySelector(`#${id}`))}
        >
          Отмена
        </button>
        <button
          className="btn btn-secondary"
          style={{ backgroundColor: mainColor }}
          type="button"
          onClick={() => {
            const modal = document.querySelector(`#${id}`);
            const form = document.querySelector(`#${id}Form`);
            const name = form.querySelector(`#nameInput_${id}`);
            const amount = form.querySelector(`#amountInput_${id}`);
            const category = form.querySelector(`#categoryInput_${id}`);
            const date = form.querySelector(`#dateInput_${id}`);

            if (name.value && amount.value && category.value && date.value) {
              if (!isCategoryExist(category.value)) {
                showErrorMessage(document.querySelector('#categoryChoiceError'));
              } else {
                onSubmit(
                  modal,
                  name,
                  amount,
                  category,
                  date,
                  inputValues.id,
                );
              }
            } else {
              flashInvalidInputs(name, amount, category, date);
            }
          }}
        >
          ОК
        </button>
      </div>
      <span id="categoryChoiceError" style={{ color: errorColor }} hidden>
        {errorMessage}
      </span>
    </form>
  );
}
OperationForm.propTypes = {
  id: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.array.isRequired,
  inputValues: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    category: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }),
};

OperationForm.defaultProps = {
  id: '',
  inputValues: {
    id: undefined,
    index: undefined,
    name: '',
    amount: '',
    category: '',
    date: todayInput(),
  },
};
