/**
 * Main dashboard data calculator.
 */

import { calculateExpenses } from './expenseCalculator';
import { calculateSafeToSpend } from './safeToSpendCalculator';

function toNumber(value) {
  return Number(value) || 0;
}

export const calculateDashboardData = (data) => {
  const transactions = data?.transactions || [];
  const recurringExpenses = data?.recurringExpenses || [];
  const goals = data?.goals || [];

  const earningsTotal = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  const expensesTotal = calculateExpenses(transactions);
  const savingsTotal = Math.max(earningsTotal - expensesTotal, 0);

  const recurringTotal = recurringExpenses.reduce((sum, e) => sum + toNumber(e.amount), 0);
  const reservedGoalSavings = goals.reduce((sum, g) => sum + toNumber(g.monthlyContribution), 0);

  const safeToSpendToday = calculateSafeToSpend(earningsTotal, expensesTotal, recurringTotal, reservedGoalSavings);

  return {
    earningsTotal,
    expensesTotal,
    savingsTotal,
    safeToSpendToday,
  };
};
