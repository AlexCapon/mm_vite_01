import { getCategories } from '../api/userData';
import capitalize from './capitalize';
import showElement from './showElement';

export default function isCategoryExist(categoryName) {
  showElement(categoryName, 'categoryName');
  return getCategories().some(
    (category) => category.name === capitalize(categoryName),
  );
}
