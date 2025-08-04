import DeckBuilder from "./components/deck-builder/DeckBuilder";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";

import NavBar from "./NavBar";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <>
      <Router>
        <div className="App">
          {/* Navigation Bar */}
          <NavBar />

          {/* Main Content */}
          <Container style={{ minHeight: "100vh" }} className="mt-3">
            <Routes>
              {/* Main routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/builder" element={<DeckBuilder />} />
              {/* <Route path="/manager" element={<ManagerPage />} /> */}

              {/* Catch-all route for 404s */}
              <Route path="*" element={<Navigate to="/index" replace />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </>
  );
}
