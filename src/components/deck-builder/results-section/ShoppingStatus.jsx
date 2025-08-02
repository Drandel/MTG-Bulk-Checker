import React from "react";
import { Card, Button } from "react-bootstrap";
import { BiCopyAlt, BiShoppingBag, BiTrophy } from "react-icons/bi";

function ShoppingStatus({ results, cardsYouNeed, totalCardsInDeck }) {
  const [showCopySuccess, setShowCopySuccess] = React.useState(false);

  if (!results || (results.missing.size === 0 && !results.canBuild)) {
    return null;
  }

  const handleCopyList = async () => {
    try {
      // Transform the results.missing Map into the desired format
      const formattedList = Array.from(results.missing.entries())
        .map(([name, data]) => {
          return `${data.needed} x ${name}`;
        })
        .join("\n");

      await navigator.clipboard.writeText(formattedList);

      setShowCopySuccess(true); // if you have state for showing success feedback
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
  };

  if (results.canBuild) {
    return (
      <Card className="mt-3 border-success" style={{ marginBottom: "8rem" }}>
        <Card.Body className="text-center">
          <BiTrophy style={{ color: "#FFB101", fontSize: "2.5rem" }} />
          <h5 className="text-success mb-1">Deck Complete!</h5>
          <p className="text-muted mb-0">
            All {totalCardsInDeck} cards are available in your bulk collection.
            Time to build!
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="mt-3 border-warning">
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h5 className="mb-1 text-warning">
              <BiShoppingBag />
              Shopping Summary
            </h5>
            <p className="mb-0 text-muted">
              You need to acquire <strong>{cardsYouNeed} cards</strong>
            </p>
          </div>
          <div className="text-center">
            <Button
              variant="outline-warning"
              size="sm"
              onClick={handleCopyList}
            >
              <BiCopyAlt style={{ marginRight: "5px" }} />
              Copy List
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ShoppingStatus;
