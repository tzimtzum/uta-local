async function generate() {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = 'Loading...';

  try {
    const ref = 'Vayikra 1:1';  // For test, you can later change this to dynamic input
    const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0&commentary=0&pad=0`;

    const response = await fetch(url);
    const data = await response.json();

    const hebrewText = Array.isArray(data.he) ? data.he.join('<br>') : data.he;
    const englishText = Array.isArray(data.text) ? data.text.join('<br>') : data.text;

    outputDiv.innerHTML = `
      <strong>Hebrew:</strong><br>${hebrewText}<br><br>
      <strong>English:</strong><br>${englishText}
    `;
  } catch (error) {
    console.error('Fetch error:', error);
    outputDiv.textContent = 'Failed to load text.';
  }
}
