/**
 * Analytics for spending behavior.
 */

import { calculateExpenses, calculateCategorySpend } from '../calculations/expenseCalculator';

const getTargetMonth = (transactions) => {
  const today = new Date();
  const currentMonthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const hasCurrentMonth = transactions.some((t) => t.date && t.date.startsWith(currentMonthStr));
  if (hasCurrentMonth) return currentMonthStr;

  if (transactions.length === 0) return currentMonthStr;
  const sorted = [...transactions].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return (sorted[0].date || '').slice(0, 7) || currentMonthStr;
};

export const getSpendingAnalytics = (data) => {
  const transactions = data?.transactions || [];
  const recurringExpenses = data?.recurringExpenses || [];

  const targetMonth = getTargetMonth(transactions);
  const monthTransactions = transactions.filter((t) => t.date && t.date.startsWith(targetMonth));
  const totalMonthlySpending = calculateExpenses(monthTransactions);

  // Previous month spending
  const [year, month] = targetMonth.split('-').map(Number);
  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear -= 1;
  }
  const prevMonthStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
  const prevMonthTransactions = transactions.filter((t) => t.date && t.date.startsWith(prevMonthStr));
  const previousMonthSpending = calculateExpenses(prevMonthTransactions);

  // Percentage change
  let spendingChangePercent = 0;
  if (previousMonthSpending > 0) {
    spendingChangePercent = ((totalMonthlySpending - previousMonthSpending) / previousMonthSpending) * 100;
  } else if (totalMonthlySpending > 0) {
    spendingChangePercent = 100;
  }

  // Category-wise spending
  const categoryMap = calculateCategorySpend(monthTransactions);
  const categoryWiseSpending = Object.entries(categoryMap).map(([category, amount]) => ({
    category,
    amount,
    share: totalMonthlySpending ? (amount / totalMonthlySpending) * 100 : 0
  })).sort((a, b) => b.amount - a.amount);

  const highestExpenseCategory = categoryWiseSpending[0]?.category || 'None';

  // Specific categories mapping
  const targetCategories = ['Food', 'Bills', 'Shopping', 'Transport', 'Subscriptions'];
  const specificCategoryTotals = {};
  targetCategories.forEach(cat => {
    specificCategoryTotals[cat] = 0;
  });
  specificCategoryTotals['Others'] = 0;

  Object.entries(categoryMap).forEach(([category, amount]) => {
    const matchedKey = targetCategories.find(
      (cat) => cat.toLowerCase() === (category || '').trim().toLowerCase()
    );
    if (matchedKey) {
      specificCategoryTotals[matchedKey] += amount;
    } else {
      specificCategoryTotals['Others'] += amount;
    }
  });

  const specificCategoryBreakdown = Object.entries(specificCategoryTotals).map(([category, amount]) => ({
    category,
    amount,
    share: totalMonthlySpending ? (amount / totalMonthlySpending) * 100 : 0
  }));

  // Average daily spending
  const daysInMonth = new Date(year, month, 0).getDate();
  const todayDate = new Date();
  const isCurrentMonth = todayDate.toISOString().slice(0, 7) === targetMonth;
  const divisor = isCurrentMonth ? todayDate.getDate() : daysInMonth;
  const averageDailySpending = totalMonthlySpending / (divisor || 1);
  const projectedMonthlySpending = averageDailySpending * daysInMonth;

  // Weekly spending: last 7 days relative to latest transaction date or current date
  const sortedTx = [...transactions]
    .filter((t) => t.date)
    .sort((a, b) => b.date.localeCompare(a.date));
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const anchor = sortedTx[0]?.date || todayStr;
  const anchorDate = new Date(anchor);
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(anchorDate);
    d.setDate(anchorDate.getDate() - i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    weekDays.push(`${yyyy}-${mm}-${dd}`);
  }
  const weeklySpending = transactions
    .filter((t) => t.type === 'expense' && t.date && weekDays.includes(t.date))
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  // Recurring vs One-time
  const totalRecurring = recurringExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalCombined = totalMonthlySpending + totalRecurring;
  const recurringRatio = totalCombined ? (totalRecurring / totalCombined) : 0;
  const oneTimeRatio = totalCombined ? (totalMonthlySpending / totalCombined) : 0;

  return {
    totalMonthlySpending,
    categoryWiseSpending,
    highestExpenseCategory,
    averageDailySpending,
    projectedMonthlySpending,
    weeklySpending,
    recurringVsOneTimeRatio: recurringRatio,
    recurringRatio,
    oneTimeRatio,
    recurringPercent: recurringRatio * 100,
    oneTimePercent: oneTimeRatio * 100,
    targetMonth,
    previousMonthSpending,
    spendingChangePercent,
    specificCategoryBreakdown
  };
};
