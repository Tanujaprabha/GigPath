export async function callAI(prompt) {
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

  console.log("AI API Key Detection:");
  console.log("- Groq Key Present:", !!groqKey);
  console.log("- OpenAI Key Present:", !!openaiKey);

  if (groqKey) {
    try {
      console.log("Groq request start...");
      
      const fetchGroq = async (model) => {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${groqKey}`
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: 'user', content: prompt }]
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid Groq API Key');
          }
          if (response.status === 429) {
            throw new Error('Groq Rate Limit Exceeded');
          }
          throw new Error(data.error?.message || 'Groq API Error');
        }
        
        if (!data.choices || data.choices.length === 0 || !data.choices[0].message?.content) {
          throw new Error('Empty response from Groq API');
        }
        
        return data.choices[0].message.content.trim();
      };

      try {
        // Try primary model
        const result = await fetchGroq('llama-3.3-70b-versatile');
        console.log("Groq response success (llama-3.3-70b-versatile)");
        return result;
      } catch (err) {
        console.warn(`Primary model failed: ${err.message}. Retrying with fallback model...`);
        // Retry with fallback model
        const fallbackResult = await fetchGroq('llama-3.1-8b-instant');
        console.log("Groq response success (llama-3.1-8b-instant fallback)");
        return fallbackResult;
      }

    } catch (err) {
      console.error("Groq Error:", err.message || err);
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
    throw new Error("No AI API keys found. Please add a VITE_GROQ_API_KEY to your .env file.");
  }
}
