import React from "react";
import { Card, FloatingLabel, Form } from "react-bootstrap";

const pageConfig = {
  bulk: {
    title: "Bulk List",
    text: "Input a list of all of your cards in bulk that you would like to pull from when making the new deck.",
    example: "EX: 3x Sol Ring or 3 Sol Ring",
  },
  newDeck: {
    title: "New Deck List",
    text: "Input the deck list for the new deck you want to create.",
    example: "EX: 3x Sol Ring or 3 Sol Ring",
  },
};

export default function CardsInput({ cards, setCards, variant }) {
  const [lineCount, setLineCount] = React.useState(0);
  const handleChange = (e) => {
    setCards(e.target.value);
    setLineCount(e.target.value.split("\n").length);
  };

  const pageVariant = pageConfig[variant];

  return (
    <Card>
      <Card.Body className="card-body-sized">
        <Card.Title>{pageVariant.title}</Card.Title>
        <Card.Text className="card-text-sized">{pageVariant.text}</Card.Text>
        <FloatingLabel
          controlId="floatingTextarea2"
          label={pageVariant.example}
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "275px", resize: "vertical", minHeight: "275px" }}
            value={cards}
            lines={15}
            onChange={(e) => handleChange(e)}
          />
          <Form.Text className="text-muted">{lineCount} lines</Form.Text>
        </FloatingLabel>
      </Card.Body>
    </Card>
  );
}
