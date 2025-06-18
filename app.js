async function fetchSefaria(ref) {
  const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0&commentary=0&pad=0`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const output = document.getElementById('output');
    output.innerHTML = `<h3>${data.he[0]}</h3><p>${data.text[0]}</p>`;
  } catch (err) {
    document.getElementById('output').innerText = 'Error fetching from Sefaria.';
  }
}

function generate() {
  const ref = "Vayikra 1:1"; // hardcoded test
  fetchSefaria(ref);
}
