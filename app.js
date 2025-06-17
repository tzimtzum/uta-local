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

    const result = await res.json();

    if (result.output) {
      output.innerText = result.output;
    } else if (result.error) {
      output.innerText = `❌ Error: ${result.error}`;
    } else {
      output.innerText = `❌ Unexpected response:\n${JSON.stringify(result, null, 2)}`;
    }

  } catch (err) {
    output.innerText = `❌ Fetch failed:\n${err.message}`;
  }
}


