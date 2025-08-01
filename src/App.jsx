import { useState } from "react";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import BulkInput from "./components/BulkInput";
import NewDeckInput from "./components/NewDeckInput";
import { Button, Col, Container, Row } from "react-bootstrap";
import { compareDecksAsync } from "./DeckFunctions";
import ResultsSection from "./components/ResultsSection";

export default function App() {
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
      <NavBar />
      <Container align="center mb-3">
        <Row className="mt-3">
          <Col>
            <BulkInput collection={collection} setCollection={setCollection} />
          </Col>
          <Col>
            <NewDeckInput newDeck={newDeck} setNewDeck={setNewDeck} />
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
