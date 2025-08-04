import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <Container fluid className="d-flex flex-column">
      {/* Welcome Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="bg-primary text-white p-5 rounded text-center">
            <h1 className="display-4 mb-3">Welcome to Card Manager</h1>
            <p className="lead">
              Your complete solution for managing Magic: The Gathering cards and
              building powerful decks.
            </p>
            <p className="mb-0">
              Track your collection, discover missing cards, and create winning
              strategies all in one place.
            </p>
          </div>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-center mb-4">Explore Our Features</h2>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Deck Builder Card */}
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-primary">
                <i className="bi bi-stack me-2"></i>
                Deck Builder
              </Card.Title>
              <Card.Text className="flex-grow-1">
                Create and customize your perfect deck with our intuitive deck
                builder. Search through thousands of cards, add them to your
                deck, and optimize your strategy. Perfect for both casual and
                competitive players looking to build their next winning
                combination.
              </Card.Text>
              <div className="mt-auto">
                <Button as={Link} to="/builder" variant="primary" size="sm">
                  Start Building →
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Collection Manager Card */}
        <Col md={6}>
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-success">
                <i className="bi bi-collection me-2"></i>
                Collection Manager
              </Card.Title>
              <Card.Text className="flex-grow-1">
                Keep track of your entire card collection with ease. View which
                cards you own, identify missing cards from your decks, and
                monitor the value of your collection. Get real-time pricing
                information and purchase links to complete your sets.
              </Card.Text>
              <div className="mt-auto">
                <Button as={Link} to="/manager" variant="success" size="sm">
                  Manage Collection →
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Getting Started Section */}
      <Row className="mt-5 flex-grow-1 align-items-end">
        <Col>
          <Card className="bg-light">
            <Card.Body className="text-center">
              <Card.Title>Ready to Get Started?</Card.Title>
              <Card.Text>
                Whether you're a seasoned planeswalker or just starting your
                journey, our tools will help you organize your cards and build
                amazing decks.
              </Card.Text>
              <div className="d-flex justify-content-center gap-2">
                <Button as={Link} to="/builder" variant="outline-primary">
                  Build a Deck
                </Button>
                <Button as={Link} to="/manager" variant="outline-success">
                  Manage Cards
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
