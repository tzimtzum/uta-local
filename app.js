async function generate() {
  const outputDiv = document.getElementById('output');
  outputDiv.textContent = 'Loading...';

  try {
    const ref = 'Vayikra 1:1';
    const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0&commentary=0&pad=0`;

    const response = await fetch(url);
    const data = await response.json();

    const hebrew = data.he || "Hebrew text not found.";
    const english = data.text || "English translation not found.";

    outputDiv.innerHTML =
      `<strong>Hebrew:</strong><br>${hebrew.join('<br>')}<br><br><strong>English:</strong><br>${english.join('<br>')}`;
  } catch (err) {
    console.error(err);
    outputDiv.textContent = 'Error loading text. Please check console.';
  }
}
