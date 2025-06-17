export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt, mode } = req.body;

  if (!prompt || !mode) {
    return res.status(400).json({ error: "Missing prompt or mode" });
  }

  const systemPrompts = {
    shiur: "You are a top-tier mechanech who gives shiurim in the selected derech halimud, with full mekorot and clarity.",
    chart: "You are a Torah analyst presenting a concept as a comparative chart between views and sources.",
    source: "You are a source sheet generator using Torah, Shas, Rishonim and Acharonim, showing Hebrew and English.",
    audio: "You generate a full voice-ready script for a Torah shiur on this topic."
  };

  const system = systemPrompts[mode] || "You are a Torah AI.";

  try {
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        temperature: 0.6,
        messages: [
          { role: "system", content: system },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await openaiRes.json();
    if (!data.choices || !data.choices[0]?.message?.content) {
      return res.status(500).json({ error: "OpenAI response missing expected structure", raw: data });
    }

    res.status(200).json({ output: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "OpenAI request failed", details: err.message });
  }
}

