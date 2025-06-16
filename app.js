const OPENAI_API_KEY = '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';

async function callGuruMode(prompt, type) {
  const output = document.getElementById('output');
  output.innerText = '⏳ Generating ' + type + '...';

  const systemPrompt = {
    shiur: "You are a top-tier mechanech who gives Brisker-style shiurim with source-based clarity and derech halimud structure.",
    chart: "You are an AI that presents conceptual Torah ideas as clear source charts with split logic.",
    source: "You are a Torah AI that builds source sheets from Chumash, Shas, Rishonim and Acharonim, in Hebrew and English.",
    audio: "You are a shiur-delivering AI. Respond with a clear text script for an audio shiur on this Torah topic."
  }[type] || "You are an AI Torah scholar.";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.6
    })
  });

  const data = await response.json();
  output.innerText = data.choices?.[0]?.message?.content || "❌ Failed to generate.";
}
