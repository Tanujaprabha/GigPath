export async function callAI(prompt) {
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

  console.log("AI API Key Detection:");
  console.log("Gemini Key Exists:", !!import.meta.env.VITE_GEMINI_API_KEY);
  console.log("- OpenAI Key Present:", !!openaiKey);

  if (geminiKey) {
    try {
      const requestUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;
      console.log("Gemini request start...");
      console.log("Request URL:", requestUrl.replace(geminiKey, "HIDDEN_KEY"));
      
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });
      
      const data = await response.json();
      console.log("Gemini raw response:", data);
      
      if (!response.ok) {
        console.error("Gemini API Full Error Object:", data.error);
        throw new Error(data.error?.message || 'Gemini API Error');
      }
      console.log("Gemini response success");
      return data.candidates[0].content.parts[0].text.trim();
    } catch (err) {
      console.error("Gemini Error:", err.message || err);
      throw err;
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
      throw err;
    }
  } else {
    console.warn("No AI API keys found.");
    throw new Error("No AI API keys found. Please add a VITE_GEMINI_API_KEY to your .env file.");
  }
}
