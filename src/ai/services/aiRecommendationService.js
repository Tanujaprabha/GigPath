import { callAI } from './aiClient';

export const generateRecommendations = async (userData) => {
  const prompt = `
You are a financial AI assistant for GigPath. Based on this user data:
${JSON.stringify(userData)}

Provide 3 smart financial recommendations (e.g. reduce subscriptions, improve savings consistency, optimize spending categories).
Keep each recommendation under 20 words.
Return ONLY a valid JSON array of objects with 'title' and 'body' properties.
Example: [{"title": "Cut Subscriptions", "body": "Reduce unnecessary recurring subscriptions to boost savings."}]
`;
  try {
    const response = await callAI(prompt);
    const cleanJSON = response.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJSON);
  } catch (err) {
    console.error("Recommendation Error:", err);
    return [
      {
        title: 'Review Recent Spending',
        body: 'Check your recent transactions to identify areas where you can cut back.'
      },
      {
        title: 'Set a Savings Goal',
        body: 'Create a new goal to start building your emergency fund or saving for a large purchase.'
      },
      {
        title: 'Monitor Recurring Costs',
        body: 'Keep an eye on subscriptions and recurring expenses to ensure you are not overpaying.'
      }
    ];
  }
};
