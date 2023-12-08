export function getBalance() {
  const balance = Number(localStorage.getItem('balance'));
  return balance || 0;
}
export function saveBalance(number) {
  localStorage.setItem('balance', number);
}
export function clearBalance() {
  localStorage.setItem('balance', []);
}

export function getOperations() {
  const raw = localStorage.getItem('operations');
  return raw ? JSON.parse(raw) : [];
}
export function saveOperations(array) {
  localStorage.setItem('operations', JSON.stringify(array));
}
export function clearOperations() {
  localStorage.setItem('operations', []);
}

export function getCategories() {
  const raw = localStorage.getItem('categories');
  return raw ? JSON.parse(raw) : [];
}
export function saveCategories(array) {
  localStorage.setItem('categories', JSON.stringify(array));
}
export function clearCategories() {
  localStorage.setItem('categories', []);
}
