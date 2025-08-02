export async function getCardByName(name) {
  const response = await fetch(
    `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(
      name.toLowerCase()
    )}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching card: ${response.statusText}`);
  }
  return response.json();
}
