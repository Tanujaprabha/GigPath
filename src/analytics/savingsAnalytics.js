/**
 * Analytics for savings progress and goals.
 */

import { getMonthlyReport, getDaysUntil } from '../utils/analytics';
import { formatMonthLabel } from '../utils/formatters';
import { safeDate } from '../utils/dateUtils';

const getTargetMonth = (transactions) => {
  const today = new Date();
  const currentMonthStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const hasCurrentMonth = transactions.some((t) => t.date && t.date.startsWith(currentMonthStr));
  if (hasCurrentMonth) return currentMonthStr;

  if (transactions.length === 0) return currentMonthStr;
  const sorted = [...transactions].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return (sorted[0].date || '').slice(0, 7) || currentMonthStr;
};

function toNumber(value) {
  return Number(value) || 0;
}

export const getSavingsAnalytics = (data) => {
  const transactions = data?.transactions || [];
  const recurringExpenses = data?.recurringExpenses || [];
  const goals = data?.goals || [];
  const targetMonth = getTargetMonth(transactions);

  // Total income and expenses in target month
  const monthTransactions = transactions.filter((t) => t.date && t.date.startsWith(targetMonth));
  const totalIncome = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  const totalExpense = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  // Savings ratio in target month (income - expense) / income
  const targetSavings = Math.max(totalIncome - totalExpense, 0);
  const savingsRatio = totalIncome ? targetSavings / totalIncome : 0;

  // Income vs Expense ratio
  const incomeVsExpenseRatio = totalIncome / (totalExpense || 1);

  // Previous month income
  const [year, month] = targetMonth.split('-').map(Number);
  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth === 0) {
    prevMonth = 12;
    prevYear -= 1;
  }
  const prevMonthStr = `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
  const prevMonthTransactions = transactions.filter((t) => t.date && t.date.startsWith(prevMonthStr));
  const previousMonthIncome = prevMonthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + toNumber(t.amount), 0);

  // Percentage change
  let incomeChangePercent = 0;
  if (previousMonthIncome > 0) {
    incomeChangePercent = ((totalIncome - previousMonthIncome) / previousMonthIncome) * 100;
  } else if (totalIncome > 0) {
    incomeChangePercent = 100;
  }

  // Average monthly income across all months that have transactions
  const monthlyIncomes = {};
  transactions.forEach((t) => {
    if (t.date && t.type === 'income') {
      const monthKey = t.date.slice(0, 7);
      monthlyIncomes[monthKey] = (monthlyIncomes[monthKey] || 0) + toNumber(t.amount);
    }
  });

  const monthKeys = Object.keys(monthlyIncomes);
  const averageMonthlyIncome = monthKeys.length
    ? monthKeys.reduce((sum, k) => sum + monthlyIncomes[k], 0) / monthKeys.length
    : 0;

  // Monthly net balance trend with monthly safe-to-spend
  const recurringTotal = recurringExpenses.reduce((sum, e) => sum + toNumber(e.amount), 0);
  const reservedGoalSavings = goals.reduce((sum, g) => sum + toNumber(g.monthlyContribution), 0);

  const netBalanceTrend = getMonthlyReport(transactions)
    .slice()
    .sort((a, b) => (a.month || '').localeCompare(b.month || ''))
    .map((item) => ({
      ...item,
      safeToSpend: Math.max(item.income - item.expense - recurringTotal - reservedGoalSavings, 0)
    }));

  // Savings Consistency: percentage of months with positive net savings
  const report = getMonthlyReport(transactions);
  const totalMonths = report.length;
  const positiveMonths = report.filter((m) => m.net > 0).length;
  const savingsConsistency = totalMonths ? (positiveMonths / totalMonths) * 100 : 100;

  return {
    totalIncome,
    totalExpense,
    averageMonthlyIncome,
    savingsRatio,
    savingsPercent: savingsRatio * 100,
    incomeVsExpenseRatio,
    netBalanceTrend,
    savingsConsistency,
    targetMonth,
    previousMonthIncome,
    incomeChangePercent,
  };
};

export const getGoalAnalytics = (data) => {
  const rawGoals = data?.goals || [];
  const transactions = data?.transactions || [];

  // Filter out goals with invalid dates defensively
  const goals = [];
  for (const goal of rawGoals) {
    if (!goal) continue;
    
    if (goal.targetDate !== undefined && goal.targetDate !== null && goal.targetDate !== "") {
      const targetDate = safeDate(goal.targetDate);
      if (!targetDate) {
        console.warn("Invalid goal date skipped", goal);
        continue;
      }
    }
    
    if (goal.deadline !== undefined && goal.deadline !== null && goal.deadline !== "") {
      const deadlineDate = safeDate(goal.deadline);
      if (!deadlineDate) {
        console.warn("Invalid goal date skipped", goal);
        continue;
      }
    }
    
    goals.push(goal);
  }

  const totalGoalTargets = goals.reduce((sum, g) => sum + toNumber(g.targetAmount), 0);
  const totalSavedAmount = goals.reduce((sum, g) => sum + toNumber(g.savedAmount), 0);
  const completionPercentage = totalGoalTargets ? (totalSavedAmount / totalGoalTargets) * 100 : 0;

  // Goal with the nearest deadline
  const goalsWithDeadline = goals.filter((g) => g.deadline);
  let nearestDeadlineGoal = null;
  if (goalsWithDeadline.length > 0) {
    const sorted = [...goalsWithDeadline].sort((a, b) => {
      const dateA = safeDate(a.deadline);
      const dateB = safeDate(b.deadline);
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;
      return dateA.getTime() - dateB.getTime();
    });
    const nearest = sorted[0];
    nearestDeadlineGoal = {
      ...nearest,
      daysLeft: getDaysUntil(nearest.deadline),
    };
  }

  // Monthly contributions sum
  const monthlyContributions = goals.reduce((sum, g) => sum + toNumber(g.monthlyContribution), 0);

  // Remaining combined amount and completion month
  const remainingTotal = Math.max(totalGoalTargets - totalSavedAmount, 0);
  let estimatedCompletionMonth = 'Indefinite';
  let monthsRemaining = Infinity;
  if (remainingTotal <= 0) {
    estimatedCompletionMonth = 'Completed';
    monthsRemaining = 0;
  } else if (monthlyContributions > 0) {
    monthsRemaining = remainingTotal / monthlyContributions;
    const today = new Date();
    if (!isNaN(monthsRemaining) && isFinite(monthsRemaining)) {
      const completionDate = new Date(today.getFullYear(), today.getMonth() + Math.ceil(monthsRemaining), 1);
      estimatedCompletionMonth = formatMonthLabel(completionDate);
    }
  }

  // Savings Consistency
  const report = getMonthlyReport(transactions);
  const totalMonths = report.length;
  const positiveMonths = report.filter((m) => m.net > 0).length;
  const savingsConsistency = totalMonths ? (positiveMonths / totalMonths) * 100 : 100;

  // Individual goals progress tracking
  const goalsProgress = goals.map((g) => {
    const targetAmount = toNumber(g.targetAmount);
    const savedAmount = toNumber(g.savedAmount);
    const remainingAmount = Math.max(targetAmount - savedAmount, 0);
    const goalCompletionPercentage = targetAmount ? (savedAmount / targetAmount) * 100 : 0;

    let goalMonthsRemaining = Infinity;
    let goalEstimatedCompletionMonth = 'Indefinite';

    if (remainingAmount <= 0) {
      goalMonthsRemaining = 0;
      goalEstimatedCompletionMonth = 'Completed';
    } else if (g.monthlyContribution && toNumber(g.monthlyContribution) > 0) {
      goalMonthsRemaining = remainingAmount / toNumber(g.monthlyContribution);
      const today = new Date();
      if (!isNaN(goalMonthsRemaining) && isFinite(goalMonthsRemaining)) {
        const completionDate = new Date(today.getFullYear(), today.getMonth() + Math.ceil(goalMonthsRemaining), 1);
        goalEstimatedCompletionMonth = formatMonthLabel(completionDate);
      }
    } else if (g.deadline) {
      const days = getDaysUntil(g.deadline);
      goalMonthsRemaining = days / 30.4;
      const deadlineDate = safeDate(g.deadline);
      if (deadlineDate) {
        goalEstimatedCompletionMonth = formatMonthLabel(deadlineDate);
      }
    }

    return {
      ...g,
      remainingAmount,
      completionPercentage: goalCompletionPercentage,
      monthsRemaining: goalMonthsRemaining,
      estimatedCompletionMonth: goalEstimatedCompletionMonth,
    };
  });

  return {
    totalGoalTargets,
    totalSavedAmount,
    completionPercentage,
    nearestDeadlineGoal,
    monthlyContributions,
    estimatedCompletionMonth,
    monthsRemaining,
    savingsConsistency,
    goalsProgress,
    goals: goalsProgress,
  };
};

