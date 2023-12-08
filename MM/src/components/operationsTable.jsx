import React from 'react';
import PropTypes from 'prop-types';
// Утилиты
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';
import { incomeColor, outcomeColor } from '../constants/styles';
import {
  caretDownIcon, caretUpIcon, penpaperIcon, trashIcon,
} from '../assets/icons';

export default function OperationsTable({
  operations, onDelete, sort, onSort, onEdit,
}) {
  function renderCaret(id) {
    if (id === sort.sortProp) {
      return sort.order === 'asc' ? caretUpIcon : caretDownIcon;
    }
    return '';
  }
  function handleSortClick(column) {
    if (sort.sortProp === column.id && sort.order === 'asc') {
      onSort({ sortProp: column.id, order: 'desc' });
    } else {
      onSort({ sortProp: column.id, order: 'asc' });
    }
  }
  if (!operations[0]) {
    return <h1>Операций за выбранный период нет</h1>;
  }
  return (
    <table className="table">
      <thead className="tableHeader">
        <tr>
          <th id="date.input" role="button" onClick={(event) => handleSortClick(event.target)}>
            {renderCaret('date.input')}
            Дата
          </th>
          <th>Баланс до операции</th>
          <th id="name" role="button" onClick={(event) => handleSortClick(event.target)}>
            {renderCaret('name')}
            Название операции
          </th>
          <th id="amount" role="button" onClick={(event) => handleSortClick(event.target)}>
            {renderCaret('amount')}
            Сумма операции
          </th>
          <th>Баланс после операции</th>
          <th id="category.name" role="button" onClick={(event) => handleSortClick(event.target)}>
            {renderCaret('category.name')}
            Категория
          </th>
          <th id="buttonsColumn"> </th>
        </tr>
      </thead>
      <tbody id="operationTable" className="table" key="tableBody">
        {operations.map((operation) => (
          <tr key={operation.id}>
            <td>{operation.date.display}</td>
            <td>{operation.balanceBefore}</td>
            <td>{operation.name}</td>
            <td
              style={{ // Цвет цифр
                color: operation.category.income ? incomeColor : outcomeColor,
              }}
            >
              {operation.amount}
            </td>
            <td>{operation.balanceBefore + operation.amount}</td>
            <td>{operation.category.name}</td>
            <td id="buttons">
              <button id="editBtn" className="btn" type="button" onClick={() => onEdit(operation)}>
                {penpaperIcon}
              </button>
              <button id="deleteBtn" className="btn" type="button" onClick={() => onDelete(operation)}>
                {trashIcon}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

OperationsTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  operations: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    sortProp: PropTypes.string.isRequired,
    order: PropTypes.string.isRequired,
  }).isRequired,
};
