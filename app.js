async function generate() {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = 'Loading...';

  try {
    const ref = "Vayikra 1:1";  // Temporary static test
    const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0&commentary=0&pad=0`;

    const response = await fetch(url);
    const data = await response.json();

    const hebrew = Array.isArray(data.he) ? data.he.join('<br>') : data.he;
    const english = Array.isArray(data.text) ? data.text.join('<br>') : data.text;

    outputDiv.innerHTML = `
      <h3>Hebrew</h3>
      <p>${hebrew}</p>
      <h3>English</h3>
      <p>${english}</p>
    `;
  } catch (err) {
    console.error(err);
    outputDiv.textContent = "Error loading from Sefaria.";
  }
}
