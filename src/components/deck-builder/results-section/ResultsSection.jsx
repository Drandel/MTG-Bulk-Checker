import { useState, useReducer, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import {
  ResultsEmpty,
  ResultsError,
  ResultsLoading,
} from "./UnfavorableResults";
import ResultsStatus from "./ResultsStatus";
import ShoppingStatus from "./ShoppingStatus";
import CardBreakdown from "./CardBreakdown";
import { statsReducer, initialState, STATS_ACTIONS } from "./statsReducer";

export default function ResultsSection({ results, isLoading, onRetry }) {
  const [stats, dispatch] = useReducer(statsReducer, initialState(results));

  useEffect(() => {
    if (results !== null) {
      dispatch({ type: STATS_ACTIONS.SET_RESULTS, results: results });
    }
  }, [results]);

  if (isLoading) {
    return <ResultsLoading />;
  }

  if (results === null || typeof results === "undefined") {
    return <ResultsEmpty />;
  }

  if (results === false) {
    return <ResultsError onRetry={onRetry} />;
  }

  return (
    <Row className="mt-4">
      <Col>
        <ResultsStatus results={results} stats={stats} />
        <ShoppingStatus
          results={results}
          cardsYouNeed={stats.cardsYouNeed}
          totalCardsInDeck={stats.totalCardsInDeck}
        />
        <Row>
          {results.available?.size > 0 && (
            <Col>
              <CardBreakdown
                variant="available"
                data={results.available}
                canBuild={results.canBuild}
              />
            </Col>
          )}
          <Col>
            <CardBreakdown variant="missing" data={results.missing} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
