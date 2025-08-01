import React from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function NewDeckInput({ newDeck, setNewDeck }) {
  return (
    <Card>
      <Card.Body className="card-body-sized">
        <Card.Title>New Deck List</Card.Title>
        <Card.Text>
          In put the deck list for the new deck you want to create.
        </Card.Text>
      </Card.Body>
      <FloatingLabel
        controlId="floatingTextarea2"
        label="EX: 3x Lightning Bolt or 3 Lightning Bolt"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          value={newDeck}
          onChange={(e) => setNewDeck(e.target.value)}
        />
      </FloatingLabel>
    </Card>
  );
}
