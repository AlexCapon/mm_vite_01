export default function isIncome(category, amount) {
  return category.income ? Number(amount) : Number(-amount);
}
