import { useState } from "react";
import NavBar from "./NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BulkInput from "./BulkInput";
import NewDeckInput from "./NewDeckInput";
import { Button, Col, Container, Row } from "react-bootstrap";
import { compareDecksAsync } from "../../DeckFunctions";
import ResultsSection from "./ResultsSection";
import CardsInput from "./CardsInput";

export default function DeckBuilder() {
  const [collection, setCollection] = useState("");
  const [newDeck, setNewDeck] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const comparisonResults = await compareDecksAsync(collection, newDeck);
      setResults(comparisonResults);
    } catch (error) {
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container align="center mb-3">
        <Row className="mt-3">
          <Col sm={12} md={6}>
            <CardsInput
              cards={collection}
              setCards={setCollection}
              variant={"bulk"}
            />
          </Col>
          <Col sm={12} md={6}>
            <CardsInput
              cards={newDeck}
              setCards={setNewDeck}
              variant={"newDeck"}
            />
          </Col>
        </Row>
        <Row align="center" className="mt-3">
          <Col>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !collection || !newDeck}
            >
              Search
            </Button>
          </Col>
        </Row>
        <ResultsSection
          results={results}
          isLoading={isLoading}
          onRetry={handleSearch}
        />
      </Container>
    </>
  );
}
