async function callGuruMode(prompt, mode) {
  const output = document.getElementById("output");
  output.innerText = "⏳ Asking Ultimate Torah Engine...";

  try {
    const res = await fetch("https://uta-gpt4-proxy.vercel.app/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, mode })
    });

    const text = await res.text(); // Read raw response body
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      output.innerText = `❌ Could not parse JSON:\n\n${text}`;
      return;
    }

    if (!res.ok) {
      output.innerText = `❌ API Error (${res.status}):\n\n${JSON.stringify(data, null, 2)}`;
      return;
    }

    output.innerText = JSON.stringify(data, null, 2); // Show OpenAI raw output

  } catch (err) {
    output.innerText = `❌ Fetch failed:\n${err.message}`;
  }
}

