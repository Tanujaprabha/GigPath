import { callAI } from '../ai/services/aiClient';
import { getDashboardAnalytics } from '../analytics/dashboardAnalytics';
import { formatCurrency } from '../utils/formatters';

/**
 * Generates local rule-based insights from user financial data.
 * Covers all 10 key categories.
 */
export const generateLocalInsights = ({ transactions, goals, recurringExpenses }) => {
  let analytics;
  try {
    analytics = getDashboardAnalytics({ transactions, goals, recurringExpenses });
  } catch (err) {
    console.error("Error calculating analytics inside local insights engine:", err);
    return [
      {
        title: "Welcome to GigPath!",
        description: "Add transactions, recurring expenses, or savings goals to unlock real-time financial insights.",
        type: "budget",
        severity: "medium",
        source: "local"
      }
    ];
  }

  const spending = analytics?.spending || {};
  const savings = analytics?.savings || {};
  const goalStats = analytics?.goals || {};
  const health = analytics?.health || { score: 50, label: 'Moderate' };

  const insightsList = [];

  const reservedGoalContribution = goals.reduce((sum, g) => sum + (Number(g.monthlyContribution) || 0), 0);
  const recurringTotal = recurringExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const safeToSpend = Math.max(savings.totalIncome - spending.totalMonthlySpending - recurringTotal - reservedGoalContribution, 0);

  // 1. Highest Spending Category
  if (spending.highestExpenseCategory && spending.highestExpenseCategory !== 'None') {
    const highestCatObj = spending.categoryWiseSpending?.[0];
    const amountStr = highestCatObj ? ` (${formatCurrency(highestCatObj.amount)})` : '';
    insightsList.push({
      title: "Highest Spending Category",
      description: `Your highest spending category is ${spending.highestExpenseCategory}${amountStr}.`,
      type: "spending",
      severity: "medium",
      source: "local"
    });
  }

  // 2. Weekly/Monthly Expense Increase/Change
  if (spending.spendingChangePercent !== 0) {
    const changeLabel = spending.spendingChangePercent > 0 ? 'increased' : 'decreased';
    const severity = spending.spendingChangePercent > 15 ? 'high' : 'medium';
    insightsList.push({
      title: spending.spendingChangePercent > 0 ? "Expense Increase" : "Expense Decrease",
      description: `Your monthly spending has ${changeLabel} by ${Math.abs(spending.spendingChangePercent).toFixed(0)}% compared to last month.`,
      type: "spending",
      severity,
      source: "local"
    });
  } else if (spending.weeklySpending > 0) {
    insightsList.push({
      title: "Weekly Activity",
      description: `You have spent ${formatCurrency(spending.weeklySpending)} over the last 7 days.`,
      type: "spending",
      severity: "low",
      source: "local"
    });
  }

  // 3. Savings Rate Improvement
  const prevMonthSavings = Math.max(savings.previousMonthIncome - spending.previousMonthSpending, 0);
  const prevSavingsPercent = savings.previousMonthIncome ? (prevMonthSavings / savings.previousMonthIncome) * 100 : 0;
  const savingsPercentChange = savings.savingsPercent - prevSavingsPercent;

  if (savingsPercentChange > 0) {
    insightsList.push({
      title: "Savings Rate Improved",
      description: `Your current monthly savings rate is ${savings.savingsPercent.toFixed(0)}%, an improvement of ${savingsPercentChange.toFixed(0)}% from last month.`,
      type: "savings",
      severity: "low",
      source: "local"
    });
  } else if (savings.savingsPercent > 0) {
    insightsList.push({
      title: "Current Savings Rate",
      description: `Your current monthly savings rate is steady at ${savings.savingsPercent.toFixed(0)}%.`,
      type: "savings",
      severity: "medium",
      source: "local"
    });
  }

  // 4. Unsafe Spending Warning
  if (spending.totalMonthlySpending > savings.totalIncome && savings.totalIncome > 0) {
    insightsList.push({
      title: "Unsafe Spending Alert",
      description: `Your expenses (${formatCurrency(spending.totalMonthlySpending)}) exceed your monthly earnings (${formatCurrency(savings.totalIncome)}).`,
      type: "budget",
      severity: "high",
      source: "local"
    });
  }

  // 5. Goal Completion Prediction
  if (goalStats.goalsProgress && goalStats.goalsProgress.length > 0) {
    const activeGoal = goalStats.goalsProgress.find(g => g.remainingAmount > 0);
    if (activeGoal) {
      if (activeGoal.estimatedCompletionMonth && activeGoal.estimatedCompletionMonth !== 'Indefinite') {
        const isNearing = activeGoal.completionPercentage >= 75;
        insightsList.push({
          title: isNearing ? "Goal Completion Nearing" : "Goal Completion Pacing",
          description: `Goal '${activeGoal.title}' is ${activeGoal.completionPercentage.toFixed(0)}% funded and projected to finish by ${activeGoal.estimatedCompletionMonth}.`,
          type: "goal",
          severity: isNearing ? "high" : "low",
          source: "local"
        });
      } else {
        insightsList.push({
          title: "Goal Progress Update",
          description: `Goal '${activeGoal.title}' is currently ${activeGoal.completionPercentage.toFixed(0)}% funded.`,
          type: "goal",
          severity: "low",
          source: "local"
        });
      }
    }
  }

  // 6. Recurring Subscription Load
  if (spending.recurringPercent > 0) {
    const severity = spending.recurringPercent > 35 ? 'high' : 'medium';
    insightsList.push({
      title: "Recurring Expense Load",
      description: `Fixed recurring obligations absorb ${spending.recurringPercent.toFixed(0)}% of your combined monthly outflows.`,
      type: "recurring",
      severity,
      source: "local"
    });
  }

  // 7. Income vs Expense Trend
  if (savings.incomeVsExpenseRatio > 0) {
    if (savings.incomeVsExpenseRatio < 1) {
      insightsList.push({
        title: "Deficit Outflow Alert",
        description: `Your monthly expenses outpace your earnings (ratio: ${savings.incomeVsExpenseRatio.toFixed(2)}x). Consider cutting discretionary spend.`,
        type: "savings",
        severity: "high",
        source: "local"
      });
    } else if (savings.incomeVsExpenseRatio >= 1.3) {
      insightsList.push({
        title: "Strong Income Runway",
        description: `Income is ${savings.incomeVsExpenseRatio.toFixed(1)}x greater than spending, generating a healthy cash runway.`,
        type: "savings",
        severity: "low",
        source: "local"
      });
    }
  }

  // 8. Safe-to-Spend Suggestions
  if (safeToSpend > 0) {
    const dailySuggest = safeToSpend / 30;
    insightsList.push({
      title: "Safe-to-Spend Suggestions",
      description: `You have ${formatCurrency(safeToSpend)} safe-to-spend today. Try keeping non-essential outflow below ${formatCurrency(dailySuggest)}/day.`,
      type: "budget",
      severity: "low",
      source: "local"
    });
  }

  // 9. Low Balance / Depleted Safe-to-Spend Alerts
  if (safeToSpend === 0 && savings.totalIncome > 0) {
    insightsList.push({
      title: "Buffer Depleted Alert",
      description: "No Safe-to-Spend balance remaining for this month. Freeze unnecessary discretionary purchases.",
      type: "budget",
      severity: "high",
      source: "local"
    });
  } else if (safeToSpend > 0 && safeToSpend <= 1000) {
    insightsList.push({
      title: "Low Safe-to-Spend Alert",
      description: `Safe-to-Spend is low at ${formatCurrency(safeToSpend)}. Avoid making unnecessary purchases.`,
      type: "budget",
      severity: "high",
      source: "local"
    });
  }

  // 10. Budget Health Summary
  insightsList.push({
    title: "Financial Health Status",
    description: `Overall budget health index is ${health.score}/100, which represents a ${health.label} financial position.`,
    type: "budget",
    severity: health.score < 50 ? "high" : "medium",
    source: "local"
  });

  // Fallback default insights if no data yet
  if (insightsList.length <= 1 && transactions.length === 0) {
    return [
      {
        title: "Welcome to GigPath!",
        description: "Log your first transaction or set a goal to generate automated financial insights.",
        type: "budget",
        severity: "low",
        source: "local"
      },
      {
        title: "Subscription Tip",
        description: "Log recurring costs under Subscriptions to monitor cash leakage automatically.",
        type: "recurring",
        severity: "low",
        source: "local"
      },
      {
        title: "Set Savings Targets",
        description: "Emergency goals can help build dynamic buffer projections.",
        type: "goal",
        severity: "low",
        source: "local"
      }
    ];
  }

  // Return unique top insights, capping at 5
  return insightsList.slice(0, 5);
};

/**
 * Generates AI-powered financial insights using Gemini API, or falls back to local engine.
 */
export const generateDashboardInsights = async ({ transactions, goals, recurringExpenses, income, expenses }) => {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const hasAIKey = !!(geminiKey || openaiKey);

  // Compute local insights as baseline fallback
  const localInsights = generateLocalInsights({ transactions, goals, recurringExpenses });

  if (!hasAIKey) {
    console.log("No AI API keys found. Returning local financial insights list.");
    return localInsights;
  }

  let analytics;
  try {
    analytics = getDashboardAnalytics({ transactions, goals, recurringExpenses });
  } catch (err) {
    console.error("Failed to compute dashboard analytics for AI prompt:", err);
  }

  const spending = analytics?.spending || {};
  const savings = analytics?.savings || {};
  const goalStats = analytics?.goals || {};
  const health = analytics?.health || { score: 50, label: 'Moderate' };

  const prompt = `
You are a financial AI assistant for the GigPath application. Analyze this user data:
Total Income: ${income}
Total Expenses: ${expenses}
Recent transactions: ${JSON.stringify((transactions || []).slice(0, 10))}
Recurring expenses: ${JSON.stringify((recurringExpenses || []).slice(0, 5))}
Goals: ${JSON.stringify(goals || [])}

Computed Metrics:
- Monthly Income: ${savings.totalIncome}
- Monthly Expenses: ${spending.totalMonthlySpending}
- Average Daily Spending: ${spending.averageDailySpending}
- Projected Monthly Spending: ${spending.projectedMonthlySpending}
- Weekly Spending (last 7 days): ${spending.weeklySpending}
- Spending Change Percent: ${(spending.spendingChangePercent || 0).toFixed(1)}%
- Savings Rate: ${(savings.savingsPercent || 0).toFixed(1)}%
- Savings Consistency: ${(savings.savingsConsistency || 100).toFixed(1)}%
- Income vs Expense Ratio: ${(savings.incomeVsExpenseRatio || 1).toFixed(2)}x
- Health Score: ${health.score}/100 (${health.label})
- Goals Completion: ${goalStats.completionPercentage}%

Based on this data, generate exactly 3 to 5 personalized, data-driven financial insights.
Try to address these topics: highest spending category, weekly/monthly expense change, savings rate or savings rate improvement, unsafe spending warnings, goal completion predictions, recurring subscription impact, income vs expense trends, safe-to-spend suggestions, low balance alerts, or budget health summary.

For each insight, provide:
1. title (punchy headline under 5 words)
2. description (clear context under 15 words, do not use quotes, dashes, or formatting)
3. type ("spending" | "savings" | "goal" | "recurring" | "budget")
4. severity ("high" if budget deficit/risk, "medium" if moderate, "low" if positive/stable status)

Return ONLY a valid JSON array of objects matching this schema:
[
  {
    "title": "Title",
    "description": "Description sentence...",
    "type": "spending" | "savings" | "goal" | "recurring" | "budget",
    "severity": "high" | "medium" | "low",
    "source": "gemini"
  }
]
Do not return any extra markdown formatting outside the JSON code block.
`;

  try {
    const response = await callAI(prompt);
    const cleanJSON = response.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJSON);

    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(insight => ({
        title: insight.title || "Insight Alert",
        description: insight.description || "Insight detail available.",
        type: insight.type || "budget",
        severity: insight.severity || "medium",
        source: "gemini"
      }));
    }
    throw new Error("Invalid structure returned from AI");
  } catch (err) {
    console.error("Gemini API/Parsing Error in generateDashboardInsights, falling back to local engine:", err);
    return localInsights;
  }
};
