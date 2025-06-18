export async function fetchSefariaText(ref: string): Promise<{
  hebrew: string[];
  english: string[];
}> {
  const url = `https://www.sefaria.org/api/texts/${encodeURIComponent(ref)}?context=0&commentary=0&pad=0`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    hebrew: data.he,
    english: data.text
  };
}
