/* eslint-disable import/order */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
// { Константы
import { mainColor } from '../constants/styles';
// API
import {
  getBalance,
  saveBalance,
  getOperations,
  saveOperations,
  getCategories,
  saveCategories,
} from '../api/userData';
// Утилиты
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
import isIncome from '../utils/isIncome';
import capitalize from '../utils/capitalize';
import switchModals from '../utils/switchModals';
import closeModalWindow from '../utils/closeModalWindow';
import getCategoryByName from '../utils/getCategoryByName';
import { firstDayOfMonthInput, formatDisplayDateFromInput, todayInput } from '../utils/formatDate';
import { orderBy } from 'lodash';
// Компоненты
import ModalWindow from '../components/modalWindow';
import CategoriesList from '../components/catgoriesList';
import DateRangeInput from '../components/dateRangeInput';
import OperationForm from '../components/operationForm';
import OperationsTable from '../components/operationsTable';
import CategoryCreateForm from '../components/categoryCreateForm';
import CurretBalnceCounter from '../components/currentBalanceCounter';

export default function Operations() {
  // Стейты
  const [currentBalance, setCurrentBalance] = useState(getBalance());
  const [operations, setOperations] = useState(getOperations());
  const [filteredOperations, setFilteredOperations] = useState(undefined);
  const [sort, setSort] = useState({ sortProp: 'date.input', order: 'desc' });
  const [categories, setCategories] = useState(getCategories());
  const [editingOperation, setEditingOperation] = useState({
    index: '',
    name: '',
    category: '',
    amount: '',
    date: '',
    id: '',
  });
  const [dateRange, setDateRange] = useState({
    startDate: firstDayOfMonthInput(new Date()),
    endDate: todayInput(),
  });
  // Вотчеры
  useEffect(() => { // Загружаем актуальные данные об операциях
    saveOperations(operations);
  }, [operations]);
  useEffect(() => { // Загружаем актуальные данные о балансе
    saveBalance(currentBalance);
  }, [currentBalance]);
  useEffect(() => { // Загружаем актуальные категории
    saveCategories(categories);
  }, [categories]);
  // Утилиты
  function setDisplayedOperations() {
    const dateFilteredOperations = operations.filter(
      (operation) => operation.date.input >= dateRange.startDate
        && operation.date.input <= dateRange.endDate,
    );
    const unsortedOperations = filteredOperations || dateFilteredOperations;
    const sortedOps = orderBy(
      unsortedOperations,
      [sort.sortProp],
      [sort.order],
    );
    return sortedOps;
  }
  function createNewOperation(
    nameInput,
    amountInput,
    categoryInput,
    dateInput,
    operationId,
  ) {
    const category = getCategoryByName(categoryInput.value);
    const operationAmount = isIncome(category, amountInput.value);
    const operation = {
      id: operationId ?? Date.now(),
      date: {
        input: dateInput.value,
        display: formatDisplayDateFromInput(dateInput.value),
      },
      name: capitalize(nameInput.value),
      balanceBefore: currentBalance,
      amount: operationAmount,
      balanceAfter: currentBalance + operationAmount,
      category: {
        name: category.name,
        color: category.color,
        income: category.income,
      },
    };
    return operation;
  }
  // Хендлеры
  function handleFiltering(category) {
    if (category) { // underfiend или строка
      setFilteredOperations(
        operations.filter((operation) => operation.category.name === category),
      );
    } else {
      setFilteredOperations(undefined);
    }
  }
  function handleSorting(item) {
    setSort(item);
  }
  function handleAddClick() { // Перенести в таблицу?
    const modal = document.querySelector('#addOperation');
    modal.showModal();
    document.addEventListener('click', (event) => {
      if (event.target.nodeName === 'DIALOG') {
        closeModalWindow(modal);
      }
    });
  }
  function handleCreateCategorySubmit(nameInput, colorInput, incomeState) {
    const newCategory = {
      id: `${Date.now()}C`,
      name: capitalize(nameInput.value),
      color: colorInput.value,
      income: incomeState.checked,
    };

    setCategories((prevState) => prevState.concat(newCategory));
    switchModals(
      document.querySelector('#createCategory'),
      document.querySelector('#addOperation'),
    );

    nameInput.value = '';
    colorInput.value = mainColor;
    incomeState.checked = false;
  }
  function handleAddSubmit(
    modal,
    name,
    amount,
    category,
    date,
    operationId = Date.now(),
  ) {
    const operation = createNewOperation(name, amount, category, date, operationId);

    setOperations((prevState) => [operation, ...prevState]);
    setCurrentBalance(operation.balanceAfter);
    closeModalWindow(modal);

    name.value = '';
    amount.value = '';
    category.value = '';
    date.value = todayInput();
  }
  function handleDelete(operation) {
    setCurrentBalance(currentBalance - operation.amount);
    setOperations((prevState) => prevState.filter((item) => item.id !== operation.id));
  }
  function handleEditClick(operation) {
    const editedOperation = {};
    operations.forEach((op, i) => {
      if (op.id === operation.id) {
        editedOperation.index = i;
        editedOperation.operation = op;
      }
    });
    const values = {
      index: editedOperation.index,
      name: editedOperation.operation.name,
      category: editedOperation.operation.category.name,
      amount: Math.abs(editedOperation.operation.amount),
      date: editedOperation.operation.date.input,
      id: editedOperation.operation.id,
    };
    setEditingOperation(values);
    document.querySelector('#editOperation').showModal();
  }
  function handleEditSubmit(
    modal,
    nameInput,
    amountInput,
    categoryInput,
    dateInput,
    operationId,
  ) {
    // Нормализуем
    const updatedName = capitalize(nameInput.value);
    const updatedCategory = getCategoryByName(categoryInput.value);
    const updatedAmount = isIncome(updatedCategory, amountInput.value);
    const updatedDate = {
      input: dateInput.value,
      display: formatDisplayDateFromInput(dateInput.value),
    };
    const clone = operations.filter(() => true);
    const editedOperation = {};
    clone.forEach((op, i) => {
      if (op.id === operationId) {
        editedOperation.index = i;
        editedOperation.operation = op;
      }
    });
    const oldAmount = editedOperation.operation.amount;
    const updatedOperation = editedOperation.operation;
    // Заносим нормализованные данные в объект операции
    updatedOperation.name = updatedName;
    updatedOperation.category = updatedCategory;
    updatedOperation.amount = updatedAmount;
    updatedOperation.date = updatedDate;
    // Заносим операцию в массив
    clone.splice(editedOperation.index, 1, updatedOperation);
    setOperations(clone);
    setCurrentBalance(currentBalance - oldAmount + updatedAmount);
    closeModalWindow(modal);
  }
  // Рендер
  return (
    <div id="operationsPageContainer" className="m-1 p-2">
      <div id="headContainer" className="container d-flex m-1">
        <div id="categoriesListContainer" className="container">
          <CategoriesList operations={setDisplayedOperations()} onFilter={handleFiltering} />
        </div>
        <div id="currentBalanceContainer" className="container">
          <CurretBalnceCounter currentBalance={currentBalance} />
        </div>
        <div id="dateRangeContainer" className="d-flex">
          <DateRangeInput dateRange={dateRange} onPick={setDateRange} />
        </div>
      </div>
      <div id="bodyContainer" className="container">
        <div id="operationsTableContainer">
          <OperationsTable
            operations={setDisplayedOperations()}
            sort={sort}
            onSort={handleSorting}
            onDelete={handleDelete}
            onEdit={handleEditClick}
          />
        </div>
      </div>
      <div id="footContainer">
        <div id="addButtonContainter" className="d-flex justify-content-end m-5">
          <button
            className="btn"
            style={{ backgroundColor: mainColor }}
            type="button"
            onClick={handleAddClick}
          >
            Добавить
          </button>
        </div>
      </div>
      <div id="modalsContainer">
        <ModalWindow id="addOperation" headTitle="Введите данные" onClose={closeModalWindow}>
          <OperationForm
            categories={categories}
            onSubmit={handleAddSubmit}
            onSwitch={switchModals}
          />
        </ModalWindow>
        <ModalWindow id="createCategory" headTitle="Введите данные" onClose={closeModalWindow}>
          <CategoryCreateForm
            onSubmit={handleCreateCategorySubmit}
            onSwitch={switchModals}
          />
        </ModalWindow>
        <ModalWindow id="editOperation" headTitle="Измените данные" onClose={closeModalWindow}>
          <OperationForm
            categories={categories}
            onSubmit={handleEditSubmit}
            onSwitch={switchModals}
            inputValues={editingOperation}
          />
        </ModalWindow>
      </div>
    </div>
  );
}
