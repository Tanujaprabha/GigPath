/**
 * General dashboard analytics aggregator.
 */

import { getSpendingAnalytics } from './spendingAnalytics';
import { getSavingsAnalytics, getGoalAnalytics } from './savingsAnalytics';
import { getFinancialHealthAnalytics } from './financialHealthAnalytics';
import { getSpendingTrends } from './trendAnalytics';

export const getDashboardAnalytics = (data) => {
  const spending = getSpendingAnalytics(data);
  const savings = getSavingsAnalytics(data);
  const goals = getGoalAnalytics(data);
  const health = getFinancialHealthAnalytics(data);
  const trends = getSpendingTrends(data);

  return {
    spending,
    savings,
    goals,
    health,
    trends,
  };
};
