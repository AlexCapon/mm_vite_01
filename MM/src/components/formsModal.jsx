/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/dialog.css';
// Утилиты
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
// Компоненты
import CategoryCreateForm from './categoryCreateForm';
import OperationForm from './operationForm';
import { getCategories, saveCategories } from '../api/userData';
import capitalize from '../utils/capitalize';
import { errorColor, mainColor } from '../constants/styles';
import FormHeader from './formHeader';
import Popover from './popover';

export default function FormsModal({ onSubmit, onClose }) {
  const [categories, setCategories] = useState(getCategories());
  useEffect(() => { // Загружаем актуальные категории
    saveCategories(categories);
  }, [categories]);
  const wrongCategoryMessage = {
    text: 'Такой категории не существует. Создайте её.',
    color: errorColor,
    id: 'wrongCategory',
  };
  const categoryExistMessage = {
    text: 'Такая категория уже существует',
    color: errorColor,
    id: 'categoryExist',
  };
  function handleSwitchForms(event) {
    const modal = document.querySelector('#addOperationModal');
    const categorySelectInput = document.querySelector('#categoryInput');
    const categoryCreateInput = document.querySelector('#categoryNameInput');
    const addDiv = modal.querySelector('#addOperationFormContainer');
    const createDiv = modal.querySelector('#createCategoryForm');
    if (event === 'submit' || event.target.id === 'cancelCreateCategoryButton' || event.target.value === '+ Создать категорию') {
      categorySelectInput.value = '';
      categoryCreateInput.value = '';
      addDiv.toggleAttribute('hidden');
      createDiv.toggleAttribute('hidden');
    }
    modal.showModal();
  }
  function handleCreateCategorySubmit(categoryNameInput, categoryColorInput, categoryIncomeState) {
    const isCategoryInList = categories.some((c) => c.name === capitalize(categoryNameInput.value));
    if (!isCategoryInList) {
      const newCategory = {
        id: `${Date.now()}C`,
        name: capitalize(categoryNameInput.value),
        color: categoryColorInput.value,
        isIncome: categoryIncomeState.checked,
      };
      setCategories((prevState) => prevState.concat(newCategory));
      // forceUpdate(Date.now());
      handleSwitchForms('submit');
      categoryNameInput.value = '';
      categoryColorInput.value = mainColor;
      categoryIncomeState.checked = false;
    } else {
      const popover = document.querySelector(`#${categoryExistMessage.id}`);
      popover.removeAttribute('hidden');
      setTimeout(() => {
        popover.setAttribute('hidden', '');
      }, 3000);
    }
  }
  // function handleError(event.target) {

  // }
  return (
    <dialog className="dialog" id="addOperationModal">
      <div className="dialog-content">
        <div className="modal-header">
          <FormHeader onClose={onClose} />
        </div>
        <div className="container modal-body" id="addOperationFormContainer">
          <AddOperationForm message={wrongCategoryMessage} categories={categories} onSwitch={handleSwitchForms} onSubmit={onSubmit} onClose={onClose} />
          <Popover message={wrongCategoryMessage} />
        </div>
        <div className="container modal-body" id="createCategoryForm" hidden>
          <CategoryCreateForm onSubmit={handleCreateCategorySubmit} onSwitch={handleSwitchForms} />
          <Popover message={categoryExistMessage} />
        </div>
      </div>
    </dialog>
  );
}
FormsModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
