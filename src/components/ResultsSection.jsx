import React, { useState } from "react";
import {
  Card,
  Badge,
  ListGroup,
  Accordion,
  Alert,
  Spinner,
  Row,
  Col,
  Button,
  ProgressBar,
} from "react-bootstrap";

export default function ResultsSection({ results, isLoading, onRetry }) {
  const [activeKey, setActiveKey] = useState(["0"]);

  console.log(results);

  // Loading state
  if (isLoading) {
    return (
      <Card className="mt-4">
        <Card.Body className="text-center">
          <Spinner animation="border" role="status" className="me-2" />
          <span>Analyzing your collection...</span>
        </Card.Body>
      </Card>
    );
  }

  // No results yet
  if (!results) {
    return (
      <Card className="mt-4">
        <Card.Body className="text-center text-muted">
          <i className="bi bi-search fs-1 d-block mb-2"></i>
          <p>Click "Search" to compare your collection with the desired deck</p>
        </Card.Body>
      </Card>
    );
  }

  // Error state
  if (results === null) {
    return (
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Error</Alert.Heading>
        <p>
          There was an error analyzing your deck lists. Please check the format
          and try again.
        </p>
        {onRetry && (
          <Button variant="outline-danger" onClick={onRetry}>
            Try Again
          </Button>
        )}
      </Alert>
    );
  }

  // Calculate statistics
  const totalCardsInDeck =
    Array.from(results.missing.values()).reduce(
      (sum, card) => sum + card.needed,
      0
    ) +
    Array.from(results.available.values()).reduce(
      (sum, card) => sum + card.needed,
      0
    );

  const cardsYouHave = Array.from(results.available.values()).reduce(
    (sum, card) => sum + card.needed,
    0
  );
  const cardsYouNeed = Array.from(results.missing.values()).reduce(
    (sum, card) => sum + card.needed,
    0
  );

  const completionPercentage =
    totalCardsInDeck > 0
      ? Math.round((cardsYouHave / totalCardsInDeck) * 100)
      : 0;

  const renderCardsToBuy = () => {
    if (results.missing.size === 0) return null;

    return (
      <ListGroup variant="flush">
        {Array.from(results.missing.entries()).map(([cardName, info]) => (
          <ListGroup.Item
            key={cardName}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <i className="bi bi-cart-plus me-2 text-danger"></i>
              <span className="fw-medium">{cardName}</span>
            </div>
            <div className="text-end">
              <Badge bg="danger" className="me-1">
                Need: {info.shortage}
              </Badge>
              {info.owned > 0 && (
                <Badge bg="secondary">Have: {info.owned}</Badge>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  const renderCardsOwned = () => {
    if (results.available.size === 0) return null;
    Array.from(results.available.entries()).map(([cardName, info]) =>
      console.log(info)
    );
    return (
      <ListGroup variant="flush">
        {Array.from(results.available.entries()).map(([cardName, info]) => (
          <ListGroup.Item
            key={cardName}
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              <i className="bi bi-cart-plus me-2 text-danger"></i>
              <span className="fw-medium">{cardName}</span>
            </div>
            <div className="text-end">
              <Badge bg="success" className="me-1">
                Have: {info.owned}
              </Badge>
              {info.needed > info.owned && (
                <Badge bg="danger">need: {info.needed - info.owned}</Badge>
              )}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  };

  return (
    <Row className="mt-4">
      <Col>
        {/* Overall Status */}
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
                      {results.canBuild
                        ? "Ready to Build!"
                        : "Shopping List Ready"}
                    </h4>
                    <p className="text-muted mb-0">
                      {results.canBuild
                        ? "You have all the cards needed in your bulk collection"
                        : `You need to acquire ${
                            results.missing.size
                          } more card${results.missing.size !== 1 ? "s" : ""}`}
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
                  <div className="fs-3 fw-bold text-success">
                    {cardsYouHave}
                  </div>
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

        {/*  Shopping Summary */}
        {results.missing.size > 0 && (
          <Card className="mt-3 border-warning">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="mb-1 text-warning">
                    <i className="bi bi-bag-fill me-2"></i>
                    Shopping Summary
                  </h5>
                  <p className="mb-0 text-muted">
                    You need to acquire <strong>{cardsYouNeed} cards</strong>
                  </p>
                </div>
                <div className="text-center">
                  <Button variant="outline-warning" size="sm">
                    <i className="bi bi-clipboard me-1"></i>
                    Copy List
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        )}

        <Row>
          <Col>
            {/* Available Card Breakdown */}
            <Accordion
              activeKey={activeKey}
              className="mt-3"
              onSelect={setActiveKey}
              alwaysOpen
            >
              {/* Cards to Buy */}
              {results.missing.size > 0 && (
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <i className="bi bi-cart-plus-fill text-success me-2"></i>
                    Already Have:
                    <Badge bg="success" className="ms-2">
                      {results.available.size} card
                      {results.available.size !== 1 && "s"}
                    </Badge>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    {renderCardsOwned()}
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>
          </Col>
          {/* Missing Card Breakdown */}
          <Col>
            <Accordion
              activeKey={activeKey}
              className="mt-3"
              onSelect={setActiveKey}
              alwaysOpen
            >
              {/* Cards to Buy */}
              {results.missing.size > 0 && (
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <i className="bi bi-cart-plus-fill text-danger me-2"></i>
                    Missing:
                    <Badge bg="danger" className="ms-2">
                      {results.missing.size} card
                      {results.missing.size !== 1 && "s"}
                    </Badge>
                  </Accordion.Header>
                  <Accordion.Body className="p-0">
                    {renderCardsToBuy()}
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>
          </Col>
        </Row>

        {/* Success Summary */}
        {results.canBuild && (
          <Card
            className="mt-3 border-success"
            style={{ marginBottom: "8rem" }}
          >
            <Card.Body className="text-center">
              <i className="bi bi-trophy-fill text-success fs-1 d-block mb-2"></i>
              <h5 className="text-success mb-1">Deck Complete!</h5>
              <p className="text-muted mb-0">
                All {totalCardsInDeck} cards are available in your bulk
                collection. Time to build!
              </p>
            </Card.Body>
          </Card>
        )}
      </Col>
    </Row>
  );
}
