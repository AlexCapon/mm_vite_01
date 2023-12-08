import React, { useState } from 'react';
// Утилиты
import { orderBy } from 'lodash';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement';

export default function CategoriesList({ operations, onFilter }) {
  const [isFiltered, setFiltered] = useState(false);
  const categoriesInList = [];
  const sortedList = orderBy(operations, 'name', 'asc');
  function сategoryInList(item) {
    return categoriesInList.includes(item.category.name);
  }
  return sortedList.map((operation) => {
    if (сategoryInList(operation)) {
      return null;
    }
    categoriesInList.push(operation.category.name);
    return (
      <button
        key={operation.name}
        className="badge m-1"
        style={{ backgroundColor: operation.category.color }}
        type="button"
        onClick={() => {
          onFilter(isFiltered ? undefined : operation.category.name);
          setFiltered((prevState) => !prevState);
        }}
      >
        {operation.category.name}
      </button>
    );
  });
}
