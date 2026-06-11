export async function callAI(prompt) {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

  console.log("AI API Key Detection:");
  console.log("- Gemini Key Present:", !!geminiKey);
  console.log("- OpenAI Key Present:", !!openaiKey);

  if (geminiKey) {
    try {
      console.log("Gemini request start...");
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Gemini API failure reason:", data.error?.message || 'Unknown Error');
        throw new Error(data.error?.message || 'Gemini API Error');
      }
      console.log("Gemini response success");
      return data.candidates[0].content.parts[0].text.trim();
    } catch (err) {
      console.error("Gemini Error:", err.message || err);
      return getSimulatedFallback(prompt);
    }
  } else if (openaiKey) {
    try {
      console.log("OpenAI request start...");
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }]
        })
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("OpenAI API failure reason:", data.error?.message || 'Unknown Error');
        throw new Error(data.error?.message || 'OpenAI API Error');
      }
      console.log("OpenAI response success");
      return data.choices[0].message.content.trim();
    } catch (err) {
      console.error("OpenAI Error:", err.message || err);
      return getSimulatedFallback(prompt);
    }
  } else {
    console.warn("No AI API keys found. Using simulated AI fallback responses.");
    return getSimulatedFallback(prompt);
  }
}

async function getSimulatedFallback(prompt) {
  console.log("Using fallback simulated AI.");
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  if (prompt.includes('3 short, insightful bullet points') || prompt.includes('3 smart financial recommendations')) {
    if (prompt.includes('Total Income')) {
      return JSON.stringify([
        "Your income outpaces expenses this month.",
        "Keep an eye on recurring subscriptions.",
        "You are on track with your goals."
      ]);
    } else {
      return JSON.stringify([
        { title: "Optimize Subscriptions", body: "You have multiple recurring expenses. Consider reviewing them to save money." },
        { title: "Boost Savings", body: "Your recent cash flow is positive. Route the excess to your emergency fund." },
        { title: "Track Groceries", body: "Your category spending fluctuates. Try setting a weekly budget." }
      ]);
    }
  } else if (prompt.includes('safe-to-spend calculation in one short')) {
    return "Your safe-to-spend amount is calculated by deducting expenses, recurring charges, and goals from your income.";
  } else {
    return "This is a simulated AI response! To get real AI answers, please add a VITE_GEMINI_API_KEY or VITE_OPENAI_API_KEY to your .env file.";
  }
}
