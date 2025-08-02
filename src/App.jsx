import "bootstrap/dist/css/bootstrap.min.css";
import DeckBuilder from "./components/deck-builder/DeckBuilder";
import NavBar from "./components/deck-builder/NavBar";

export default function App() {
  return (
    <>
      <NavBar />
      <DeckBuilder />
    </>
  );
}
