import React from "react";
import { Card, Row, Col, ProgressBar } from "react-bootstrap";

export default function ResultsStatus({ results, stats }) {
  const { totalCardsInDeck, cardsYouHave, cardsYouNeed, completionPercentage } =
    stats;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={8}>
            <div className="d-flex align-items-center mb-2">
              {results.canBuild ? (
                <i className="bi bi-check-circle-fill text-success fs-2 me-3"></i>
              ) : (
                <i className="bi bi-cart-fill text-warning fs-2 me-3"></i>
              )}
              <div>
                <h4 className="mb-1">
                  {results.canBuild ? "Ready to Build!" : "Shopping List Ready"}
                </h4>
                <p className="text-muted mb-0">
                  {results.canBuild
                    ? "You have all the cards needed in your bulk collection"
                    : `You need to acquire ${results.missing.size} more card${
                        results.missing.size !== 1 ? "s" : ""
                      }`}
                </p>
              </div>
            </div>
            <ProgressBar
              now={completionPercentage}
              label={`${completionPercentage}% Complete`}
              variant={results.canBuild ? "success" : "warning"}
            />
          </Col>
          <Col md={4} className="text-center">
            <div className="border-start ps-3">
              <div className="fs-3 fw-bold text-success">{cardsYouHave}</div>
              <div className="text-muted small">
                of {totalCardsInDeck} cards owned
              </div>
              {cardsYouNeed > 0 && (
                <div className="mt-1">
                  <span className="fs-5 fw-bold text-danger">
                    {cardsYouNeed}
                  </span>
                  <span className="text-muted small"> to buy</span>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
