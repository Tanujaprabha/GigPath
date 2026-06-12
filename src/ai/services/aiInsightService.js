import { callAI } from './aiClient';
import { getDashboardAnalytics } from '../../analytics/dashboardAnalytics';
import { formatCurrency } from '../../utils/formatters';

export const generateLocalInsights = ({ transactions, goals, recurringExpenses }) => {
  let analytics;
  try {
    analytics = getDashboardAnalytics({ transactions, goals, recurringExpenses });
  } catch (err) {
    console.error("Error calculating analytics inside local insights engine:", err);
    return {
      insights: ["Welcome to GigPath! Enter your financial data to generate insights."],
      priority: "medium",
      recommendations: [{ title: "Track Activity", body: "Add transaction logs to start tracking your cash flow." }],
      financialHealthScore: 50
    };
  }

  const spending = analytics?.spending || {};
  const savings = analytics?.savings || {};
  const goalStats = analytics?.goals || {};
  const health = analytics?.health || { score: 50, label: 'Moderate' };

  const insights = [];

  // 1. Highest spending category
  if (spending.highestExpenseCategory && spending.highestExpenseCategory !== 'None') {
    const highestCatObj = spending.categoryWiseSpending?.[0];
    const amountStr = highestCatObj ? ` (${formatCurrency(highestCatObj.amount)})` : '';
    insights.push(`Your highest spending category is ${spending.highestExpenseCategory}${amountStr}.`);
  }

  // 2. Weekly spending
  if (spending.weeklySpending > 0) {
    insights.push(`You spent ${formatCurrency(spending.weeklySpending)} in the last 7 days.`);
  }

  // 3. Savings Rate & Consistency
  if (savings.savingsPercent > 0) {
    insights.push(`Your current monthly savings rate is ${savings.savingsPercent.toFixed(0)}%.`);
  }
  if (savings.savingsConsistency !== undefined) {
    if (savings.savingsConsistency < 100) {
      insights.push(`Your monthly savings consistency is at ${savings.savingsConsistency.toFixed(0)}%.`);
    } else if (transactions.length > 0) {
      insights.push("You have saved money consistently every single month.");
    }
  }

  // 4. Overspending / Budget Health
  if (spending.totalMonthlySpending > savings.totalIncome && savings.totalIncome > 0) {
    insights.push(`Overspending Warning: Expenses (${formatCurrency(spending.totalMonthlySpending)}) exceed income (${formatCurrency(savings.totalIncome)}) this month.`);
  } else if (savings.totalIncome > 0) {
    insights.push(`Budget Health: You have saved ${formatCurrency(Math.max(savings.totalIncome - spending.totalMonthlySpending, 0))} this month.`);
  }

  // 5. Goal progress
  if (goalStats.goalsProgress && goalStats.goalsProgress.length > 0) {
    const activeGoal = goalStats.goalsProgress.find(g => g.remainingAmount > 0);
    if (activeGoal) {
      if (activeGoal.estimatedCompletionMonth && activeGoal.estimatedCompletionMonth !== 'Indefinite') {
        insights.push(`Goal Pace: '${activeGoal.title}' is on track to be completed by ${activeGoal.estimatedCompletionMonth}.`);
      } else {
        insights.push(`Goal Progress: '${activeGoal.title}' is ${activeGoal.completionPercentage.toFixed(0)}% funded.`);
      }
    }
  }

  // 6. Recurring fixed costs
  if (spending.recurringPercent > 0) {
    insights.push(`Recurring fixed costs consume ${spending.recurringPercent.toFixed(0)}% of your monthly outflows.`);
  }

  // 7. Safe-to-spend
  const reservedGoalSavings = goals.reduce((sum, g) => sum + (Number(g.monthlyContribution) || 0), 0);
  const recurringTotal = recurringExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const safeToSpend = Math.max(savings.totalIncome - spending.totalMonthlySpending - recurringTotal - reservedGoalSavings, 0);
  if (safeToSpend === 0 && savings.totalIncome > 0) {
    insights.push("Low Buffer Alert: No Safe-to-Spend balance remaining for this month.");
  } else if (safeToSpend > 0) {
    insights.push(`Safe-to-Spend: You have ${formatCurrency(safeToSpend)} safe for discretionary purchases.`);
  }

  // Fallbacks if no data yet
  if (insights.length === 0) {
    insights.push("Welcome to GigPath! Add your income, expenses, and goals to generate automated AI insights.");
    insights.push("Tip: Set a monthly savings goal to build your cash runway.");
    insights.push("Tip: Track recurring subscriptions to avoid leakage.");
  }

  // Generate recommendations
  const recommendations = [];
  if (spending.recurringPercent > 30) {
    recommendations.push({
      title: "Reduce Fixed Expenses",
      body: "Your fixed subscriptions and recurring costs are high. Review and cancel unused memberships."
    });
  } else {
    recommendations.push({
      title: "Optimize Subscriptions",
      body: "Audit your monthly subscriptions to optimize cash margin."
    });
  }

  if (savings.savingsPercent < 20) {
    recommendations.push({
      title: "Boost Your Savings Rate",
      body: "Try to set aside at least 20% of your earnings to build a robust financial runway."
    });
  } else {
    recommendations.push({
      title: "Invest Surplus Margin",
      body: "Your savings rate is strong! Consider investing the excess to grow your wealth."
    });
  }

  if (goalStats.goalsProgress && goalStats.goalsProgress.length > 0) {
    const laggingGoal = goalStats.goalsProgress.find(g => g.completionPercentage < 50);
    if (laggingGoal) {
      recommendations.push({
        title: `Prioritize ${laggingGoal.title}`,
        body: `Increase monthly contribution to achieve "${laggingGoal.title}" faster.`
      });
    } else {
      recommendations.push({
        title: "Track Goal Milestones",
        body: "You're pacing well on active goals. Keep up the consistent contributions."
      });
    }
  } else {
    recommendations.push({
      title: "Create a Savings Goal",
      body: "Set up a goal (e.g. tax fund or emergency reserve) to give your savings direction."
    });
  }

  // Priority
  let priority = 'medium';
  if (spending.totalMonthlySpending > savings.totalIncome && savings.totalIncome > 0) {
    priority = 'high';
  } else if (safeToSpend <= 1000 && savings.totalIncome > 0) {
    priority = 'high';
  }

  return {
    insights: insights.slice(0, 5),
    priority,
    recommendations,
    financialHealthScore: health.score
  };
};

export const generateDashboardInsights = async ({ transactions, goals, recurringExpenses, income, expenses }) => {
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const hasAIKey = !!(groqKey || openaiKey);

  let analytics;
  try {
    analytics = getDashboardAnalytics({ transactions, goals, recurringExpenses });
  } catch (err) {
    console.error("Failed to compute dashboard analytics for AI prompt:", err);
  }

  // Compute local insights as baseline / fallback
  const localInsights = generateLocalInsights({ transactions, goals, recurringExpenses });

  if (!hasAIKey) {
    console.log("No AI API keys found. Returning local financial insights.");
    return localInsights;
  }

  const spending = analytics?.spending || {};
  const savings = analytics?.savings || {};
  const goalStats = analytics?.goals || {};
  const health = analytics?.health || { score: 50, label: 'Moderate' };

  const prompt = `
You are a financial AI assistant for the GigPath application. Analyze this user data:
Total overall income: ${income}
Total overall expenses: ${expenses}
Recent transactions: ${JSON.stringify((transactions || []).slice(0, 10))}
Recurring expenses: ${JSON.stringify((recurringExpenses || []).slice(0, 5))}
Goals: ${JSON.stringify(goals || [])}

Computed Metrics:
- Monthly Income: ${savings.totalIncome}
- Monthly Expenses: ${spending.totalMonthlySpending}
- Average Daily Spending: ${spending.averageDailySpending}
- Weekly Spending (last 7 days): ${spending.weeklySpending}
- Savings Rate: ${(savings.savingsPercent || 0).toFixed(1)}%
- Savings Consistency: ${(savings.savingsConsistency || 100).toFixed(1)}%
- Health Score: ${health.score}/100 (${health.label})
- Goals Completion: ${goalStats.completionPercentage}%

Based on this, generate exactly:
1. 3 to 4 personalized, data-driven insights (e.g. highlight category spending, weekly trend, savings rate, safe-to-spend level, or goal runway). Keep each insight brief (under 12 words) and do NOT use markdown, quotes, dashes or bullet characters.
2. An appropriate priority for the budget state: "high" (if overspending or low balance), "medium" (otherwise).
3. exactly 3 recommendations: title (under 4 words) and body (under 15 words).

Return ONLY a valid JSON object matching this schema:
{
  "insights": ["Point 1", "Point 2", "Point 3"],
  "priority": "high" | "medium" | "low",
  "recommendations": [{"title": "Title", "body": "Description"}]
}
Do not return any extra markdown formatting outside the JSON code block.
`;

  try {
    const response = await callAI(prompt);
    const cleanJSON = response.replace(/```json/g, '').replace(/```/g, '').trim();
    const result = JSON.parse(cleanJSON);
    
    // Ensure structure is correct
    if (Array.isArray(result.insights) && result.insights.length > 0) {
      return {
        insights: result.insights,
        priority: result.priority || localInsights.priority,
        recommendations: Array.isArray(result.recommendations) ? result.recommendations : localInsights.recommendations,
        financialHealthScore: health.score
      };
    }
    throw new Error("Invalid structure returned from AI");
  } catch (err) {
    console.error("AI API/Parsing Error in generateDashboardInsights, falling back to local engine:", err);
    return localInsights;
  }
};

export const explainSafeToSpend = async ({ totalIncome, totalExpenses, recurringTotal, reservedGoalSavings, safeToSpend }) => {
  const prompt = `
You are a financial AI assistant for GigPath. Explain the user's safe-to-spend calculation in one short, clear, friendly sentence.
Total Income: ${totalIncome}
Total Expenses: ${totalExpenses}
Recurring Expenses: ${recurringTotal}
Reserved Goal Savings: ${reservedGoalSavings}
Final Safe to Spend: ${safeToSpend}

Example: "Your safe-to-spend amount is ₹1453 after subtracting expenses, recurring payments, and reserved goal savings from your total income."
Provide ONLY the explanation sentence without quotes.
`;

  try {
    const response = await callAI(prompt);
    return response.replace(/^"|"$/g, '').trim();
  } catch (err) {
    console.error("AI API Error in explainSafeToSpend:", err);
    return `Your safe-to-spend amount is ${safeToSpend} after deducting expenses, recurring charges, and goals from income.`;
  }
};
