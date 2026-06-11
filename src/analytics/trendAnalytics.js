/**
 * Analytics for detecting spending trends and financial behaviors.
 */

import { getSavingsAnalytics } from './savingsAnalytics';
import { getSpendingAnalytics } from './spendingAnalytics';

function toNumber(value) {
  return Number(value) || 0;
}

export const getSpendingTrends = (data) => {
  const transactions = data?.transactions || [];
  const recurringExpenses = data?.recurringExpenses || [];
  const goals = data?.goals || [];

  const spending = getSpendingAnalytics(data);
  const savings = getSavingsAnalytics(data);

  const currIncome = savings.totalIncome;
  const currExpense = spending.totalMonthlySpending;
  
  // Previous month calculations
  const targetMonth = spending.targetMonth;
  const [year, month] = targetMonth.split('-').map(Number);
  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear -= 1;
  }
  const prevMonthStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}`;

  const prevMonthTransactions = transactions.filter((t) => t.date && t.date.startsWith(prevMonthStr));
  const prevIncome = prevMonthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + toNumber(t.amount), 0);
  const prevExpense = prevMonthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  const currSavingsRatio = savings.savingsRatio;
  const prevSavingsRatio = prevIncome ? Math.max(prevIncome - prevExpense, 0) / prevIncome : 0;

  const totalRecurring = recurringExpenses.reduce((sum, e) => sum + toNumber(e.amount), 0);
  const totalCombinedExpense = currExpense + totalRecurring;
  const recurringRatio = totalCombinedExpense ? totalRecurring / totalCombinedExpense : 0;

  const reservedGoalSavings = goals.reduce((sum, g) => sum + toNumber(g.monthlyContribution), 0);
  const safeToSpend = Math.max(currIncome - currExpense - totalRecurring - reservedGoalSavings, 0);

  const trends = [];

  // 1. Overspending Trend
  if (currExpense > currIncome && currIncome > 0) {
    trends.push({
      type: 'overspending',
      title: 'Overspending Alert',
      message: `Your monthly expenses (${currExpense}) exceed your income (${currIncome}).`,
      severity: 'warning',
    });
  }

  // 2. High Recurring Expenses Trend
  if (recurringRatio > 0.3) {
    trends.push({
      type: 'high_recurring',
      title: 'High Fixed Costs',
      message: `Recurring bills eat up ${(recurringRatio * 100).toFixed(0)}% of your monthly outflows.`,
      severity: 'info',
    });
  }

  // 3. Improved Savings Trend
  if (currSavingsRatio > prevSavingsRatio && currIncome > 0 && prevIncome > 0) {
    trends.push({
      type: 'improved_savings',
      title: 'Improved Savings',
      message: `Your savings rate is higher than last month (${(currSavingsRatio * 100).toFixed(0)}% vs ${(prevSavingsRatio * 100).toFixed(0)}%).`,
      severity: 'positive',
    });
  }

  // 4. Risky Spending Patterns Trend
  if (safeToSpend <= 1000 && currIncome > 0) {
    trends.push({
      type: 'risky_spending',
      title: 'Risky Cash Buffer',
      message: `Your safe-to-spend amount is low. Avoid non-essential expenses to protect your margin.`,
      severity: 'warning',
    });
  } else if (currIncome > 0 && currExpense / currIncome > 0.85) {
    trends.push({
      type: 'risky_spending',
      title: 'High Outflow Pattern',
      message: 'You have spent over 85% of your income this month.',
      severity: 'warning',
    });
  }

  return trends;
};
