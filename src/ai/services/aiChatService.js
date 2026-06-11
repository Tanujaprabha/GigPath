import { callAI } from './aiClient';

export const sendMessageToAI = async (message, contextData) => {
  const prompt = `
You are a helpful financial AI assistant for the GigPath app. Answer the user's question using their real financial data below as context. Keep your response concise, friendly, and under 50 words.

Context Data (JSON):
${JSON.stringify(contextData)}

User Question: ${message}
`;
  try {
    return await callAI(prompt);
  } catch (error) {
    console.error("Chat Error:", error);
    return "I'm having trouble connecting to the AI brain right now. Please try again later or check your API keys.";
  }
};
