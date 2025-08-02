import { act } from "react";

function calcualteStats(results) {
  // Calculate total cards you have (available)
  const cardsYouHave = Array.from(results.available.values()).reduce(
    (sum, card) => sum + card.needed,
    0
  );

  // Calculate total cards you need (missing)
  const cardsYouNeed = Array.from(results.missing.values()).reduce(
    (sum, card) => sum + card.needed,
    0
  );

  // Calculate total cards in deck
  const totalCardsInDeck = cardsYouHave + cardsYouNeed;

  // Calculate completion percentage
  const completionPercentage =
    totalCardsInDeck > 0
      ? Math.round((cardsYouHave / totalCardsInDeck) * 100)
      : 0;

  return {
    totalCardsInDeck,
    cardsYouHave,
    cardsYouNeed,
    completionPercentage,
  };
}

// statsReducer.js
export const initialState = (results) => {
  if (!results || !results.missing || !results.available) {
    return {
      totalCardsInDeck: 0,
      cardsYouHave: 0,
      cardsYouNeed: 0,
      completionPercentage: 0,
    };
  }

  return calcualteStats(results);
};

export const STATS_ACTIONS = {
  RESET_STATS: "RESET_STATS",
  SET_RESULTS: "SET_RESULTS",
};

export function statsReducer(state, action) {
  switch (action.type) {
    case STATS_ACTIONS.RESET_STATS:
      return {
        totalCardsInDeck: 0,
        cardsYouHave: 0,
        cardsYouNeed: 0,
        completionPercentage: 0,
      };

    case STATS_ACTIONS.SET_RESULTS:
      return action.results ? calcualteStats(action.results) : initialState();
    default:
      return state;
  }
}
