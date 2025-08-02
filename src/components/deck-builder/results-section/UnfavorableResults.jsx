import React from "react";
import { Card, Alert, Spinner, Button } from "react-bootstrap";

export function ResultsLoading() {
  return (
    <Card className="mt-4">
      <Card.Body className="text-center">
        <Spinner animation="border" role="status" className="me-2" />
        <span>Analyzing your collection...</span>
      </Card.Body>
    </Card>
  );
}

export function ResultsEmpty() {
  return (
    <Card className="mt-4">
      <Card.Body className="text-center text-muted">
        <i className="bi bi-search fs-1 d-block mb-2"></i>
        <p>Click "Search" to compare your collection with the desired deck</p>
      </Card.Body>
    </Card>
  );
}
export function ResultsError({ onRetry }) {
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
