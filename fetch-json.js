async function fetchJson(url) {
  try {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching JSON:", error);
    return null;
  }
}

const fetchVerses = fetchJson("./data/verses.json");

export { fetchVerses }
