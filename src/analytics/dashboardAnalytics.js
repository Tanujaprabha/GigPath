/**
 * General dashboard analytics aggregator.
 */

import { getSpendingAnalytics } from './spendingAnalytics';
import { getSavingsAnalytics, getGoalAnalytics } from './savingsAnalytics';
import { getFinancialHealthAnalytics } from './financialHealthAnalytics';
import { getSpendingTrends } from './trendAnalytics';
import { safeDate } from '../utils/dateUtils';

export const getDashboardAnalytics = (data) => {
  // Validate and clean transactions
  const rawTransactions = data?.transactions || [];
  const cleanTransactions = [];
  for (const t of rawTransactions) {
    if (!t) continue;
    if (t.date !== undefined && t.date !== null && t.date !== "") {
      const d = safeDate(t.date);
      if (!d) {
        console.warn("Invalid transaction skipped:", t);
        continue;
      }
    }
    cleanTransactions.push(t);
  }

  // Validate and clean goals
  const rawGoals = data?.goals || [];
  const cleanGoals = [];
  for (const g of rawGoals) {
    if (!g) continue;
    if (g.targetDate !== undefined && g.targetDate !== null && g.targetDate !== "") {
      const d = safeDate(g.targetDate);
      if (!d) {
        console.warn("Invalid goal skipped:", g);
        continue;
      }
    }
    if (g.deadline !== undefined && g.deadline !== null && g.deadline !== "") {
      const d = safeDate(g.deadline);
      if (!d) {
        console.warn("Invalid goal skipped:", g);
        continue;
      }
    }
    cleanGoals.push(g);
  }

  // Validate and clean recurringExpenses
  const rawRecurring = data?.recurringExpenses || [];
  const cleanRecurring = [];
  for (const r of rawRecurring) {
    if (!r) continue;
    if (r.nextCharge !== undefined && r.nextCharge !== null && r.nextCharge !== "") {
      const d = safeDate(r.nextCharge);
      if (!d) {
        console.warn("Invalid recurring expense skipped:", r);
        continue;
      }
    }
    cleanRecurring.push(r);
  }

  // Validate and clean insights
  const rawInsights = data?.insights || [];
  const cleanInsights = [];
  for (const i of rawInsights) {
    if (!i) continue;
    if (i.createdAt !== undefined && i.createdAt !== null && i.createdAt !== "") {
      const d = safeDate(i.createdAt);
      if (!d) {
        console.warn("Invalid insight skipped:", i);
        continue;
      }
    }
    cleanInsights.push(i);
  }

  const cleanData = {
    ...data,
    transactions: cleanTransactions,
    goals: cleanGoals,
    recurringExpenses: cleanRecurring,
    insights: cleanInsights,
  };

  const spending = getSpendingAnalytics(cleanData);
  const savings = getSavingsAnalytics(cleanData);
  const goals = getGoalAnalytics(cleanData);
  const health = getFinancialHealthAnalytics(cleanData);
  const trends = getSpendingTrends(cleanData);

  return {
    spending,
    savings,
    goals,
    health,
    trends,
  };
};

