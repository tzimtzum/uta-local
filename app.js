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

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      output.innerText = `❌ Could not parse JSON:\n\n${text}`;
      return;
    }

    if (!res.ok || !data.output) {
      output.innerText = `❌ API Error (${res.status}):\n\n${JSON.stringify(data, null, 2)}`;
      return;
    }

    output.innerHTML = formatGuruOutput(data.output);

  } catch (err) {
    output.innerText = `❌ Fetch failed:\n${err.message}`;
  }
}

function generate() {
  const prompt = document.getElementById("prompt").value.trim();
  const mode = document.getElementById("mode").value;

  if (!prompt) {
    document.getElementById("output").innerText = "Please enter a Torah topic or question.";
    return;
  }

  callGuruMode(prompt, mode);
}

function formatGuruOutput(raw) {
  // Allow limited HTML formatting, tables, headers, etc.
  return raw
    .replace(/\n/g, "<br>")
    .replace(/\|---\|.*\|/g, "")
    .replace(/\|([^|]+)\|([^|]+)\|([^|]+)\|/g, '<table border="1"><tr><td>$1</td><td>$2</td><td>$3</td></tr></table>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
}


