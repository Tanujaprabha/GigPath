/**
 * Calculator for expense breakdown and totals.
 */

function toNumber(value) {
  return Number(value) || 0;
}

export const calculateExpenses = (transactions) => {
  return (transactions || [])
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + toNumber(t.amount), 0);
};

export const calculateCategorySpend = (transactions) => {
  const expenseTransactions = (transactions || []).filter((t) => t.type === 'expense');
  const categoryMap = {};
  expenseTransactions.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + toNumber(t.amount);
  });
  return categoryMap;
};
