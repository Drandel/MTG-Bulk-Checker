function parseDeckList(deckString) {
  if (!deckString?.trim()) return new Map();

  const cards = new Map();
  const cardPattern = /^(\d+)x?\s+(.+)$/i;

  const lines = deckString.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const match = line.match(cardPattern);

    if (match) {
      const quantity = parseInt(match[1], 10);
      const cardName = match[2].trim();
      cards.set(cardName, (cards.get(cardName) || 0) + quantity);
    } else {
      cards.set(line, (cards.get(match[2].trim()) || 0) + 1);
    }
  }

  return cards;
}

// Optimized comparison using Maps and single-pass algorithm
function compareDecks(collectionString, newDeckString) {
  const collection = parseDeckList(collectionString);
  const newDeck = parseDeckList(newDeckString);

  const results = {
    canBuild: true,
    missing: new Map(),
    available: new Map(),
  };

  // Single pass through new deck requirements
  for (const [cardName, needed] of newDeck) {
    const owned = collection.get(cardName) || 0;

    if (owned >= needed) {
      results.available.set(cardName, {
        needed,
        owned,
      });
    } else {
      results.canBuild = false;
      results.missing.set(cardName, {
        needed,
        owned,
        shortage: needed - owned,
      });
      // Add to available if at least one is owned
      if (owned > 0) {
        results.available.set(cardName, {
          needed,
          owned,
        });
      }
    }
  }
  return results;
}

function sortMapByKeys(map) {
  const sorted = new Map();
  const sortedKeys = Array.from(map.keys()).sort();

  for (const key of sortedKeys) {
    sorted.set(key, map.get(key));
  }

  return sorted;
}

export function compareDecksAsync(collectionString, newDeckString) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = compareDecks(collectionString, newDeckString);
        result.available = sortMapByKeys(result.available);
        result.missing = sortMapByKeys(result.missing);
        resolve(result);
      } catch (error) {
        console.error("Error in async comparison:", error);
        reject(error);
      }
    }, 0);
  });
}
