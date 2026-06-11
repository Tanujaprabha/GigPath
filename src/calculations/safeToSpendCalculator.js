/**
 * Calculator for "Safe to Spend" amount.
 */

export const calculateSafeToSpend = (income, expenses, recurringExpenses = 0, reservedGoalSavings = 0) => {
  return Math.max(income - expenses - Number(recurringExpenses || 0) - Number(reservedGoalSavings || 0), 0);
};
