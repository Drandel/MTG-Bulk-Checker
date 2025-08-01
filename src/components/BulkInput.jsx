import React from "react";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

export default function BulkInput({ collection, setCollection }) {
  return (
    <Card>
      <Card.Body className="card-body-sized">
        <Card.Title>Bulk List</Card.Title>
        <Card.Text>
          Input a list of all of your cards in bulk that you would like to pull
          from when making the new deck.
        </Card.Text>
      </Card.Body>
      <FloatingLabel
        controlId="floatingTextarea1"
        label="EX: 3x Lightning Bolt or 3 Lightning Bolt"
      >
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          style={{ height: "100px" }}
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        />
      </FloatingLabel>
    </Card>
  );
}
