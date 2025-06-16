async function callGuruMode(prompt, mode) {
  const output = document.getElementById("output");
  output.innerText = "🕐 Generating response...";

  try {
    const res = await fetch("https://uta-gpt4-proxy.vercel.app/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt, mode })
    });

    const data = await res.json();
    output.innerText = res.ok ? data.result : `❌ Error: ${data.error || "Unknown error"}`;
  } catch (err) {
    output.innerText = "❌ Request failed. Please try again.";
  }
}

