let sourceSheet = [];

async function generate() {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = 'Loading...';

  try {
    const prompt = document.getElementById('prompt').value.trim();
    const ref = prompt || 'Vayikra 1:1';
    const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0&commentary=0&pad=0`;

    const response = await fetch(url);
    const data = await response.json();

    console.log("📜 Hebrew:", data.he);
    console.log("🗣 English:", data.text);

    const hebrew = Array.isArray(data.he)
      ? data.he.map(line => line.replace(/<[^>]+>/g, '')).join('<br>')
      : (data.he || "⚠️ Hebrew not found.").replace(/<[^>]+>/g, '');

    const english = Array.isArray(data.text)
      ? data.text.map(line => line.replace(/<[^>]+>/g, '')).join('<br>')
      : (data.text || "⚠️ English not found.").replace(/<[^>]+>/g, '');

    outputDiv.innerHTML = `
  <h3>${ref}</h3>
  <button onclick="addToSourceSheet('${ref}', \`${hebrew}\`, \`${english}\`)">➕ Add to Source Sheet</button>
  <div style="margin-top: 1rem">
    <div style="text-align: right; direction: rtl;">
      <strong>Hebrew:</strong><br>${hebrew}
    </div>
    <br>
    <div style="text-align: left; direction: ltr;">
      <strong>English:</strong><br>${english}
    </div>
  </div>
`;

  } catch (err) {
    console.error("❌ Error fetching Sefaria data:", err);
    outputDiv.textContent = "Error loading from Sefaria.";
  }
}

function addToSourceSheet(ref, hebrew, english) {
  sourceSheet.push({ ref, hebrew, english });
  console.log("✅ Source Sheet Updated:", sourceSheet);
  alert(`${ref} added to your source sheet!`);
}



