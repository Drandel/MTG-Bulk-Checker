import React from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import scryfallIcon from "../../../assets/scryfall-icon.png";
import tcgIcon from "../../../assets/tcg-icon.png";
import edhrecIcon from "../../../assets/edhrec-icon.png";

export default function CardInfoPopover({ cardInfo }) {
  console.log(cardInfo);
  if (!cardInfo) {
    return <Spinner animation="border" role="status" className="me-2" />;
  }

  const getImageUri = (card) => {
    if (card.image_uris) {
      return card.image_uris.normal;
    } else if (card.card_faces && card.card_faces.length > 0) {
      return card.card_faces[0].image_uris.normal;
    }
    return false;
  };

  const getPrice = (card) => {
    if (!card.prices) {
      return "N/A";
    }
    if (card.prices.usd) {
      return card.prices.usd;
    } else if (card.prices.usd_etched) {
      return card.card_faces[0].prices.usd;
    } else if (card.prices.usd_foil) {
      return card.prices.usd_foil;
    }
    return "N/A";
  };

  const handleButtonClick = (e, mode) => {
    e.stopPropagation();
    if (mode === "scryfall") {
      window.open(cardInfo.scryfall_uri, "_blank");
      return;
    }
    if (mode === "edhrec") {
      window.open(cardInfo.related_uris.edhrec, "_blank");
      return;
    }
    window.open(cardInfo.purchase_uris.tcgplayer, "_blank");
  };

  return (
    <>
      <Image src={getImageUri(cardInfo)} rounded style={{ width: "100%" }} />
      <Container className="mt-2">
        <Row className="text-center">
          <h5>Price</h5>
        </Row>
        <Row className="text-center">
          <p>${getPrice(cardInfo)}</p>
        </Row>
        <Row className="text-center">
          <Col md={4} style={{ padding: "0" }}>
            <Button
              variant="info"
              className="ms-2"
              onMouseDown={(e) => handleButtonClick(e, "tcg")}
              style={{ padding: "0" }}
            >
              <Image src={tcgIcon} style={{ width: "50%", padding: "5px" }} />
            </Button>
          </Col>
          <Col md={4} style={{ padding: "0" }}>
            <Button
              variant=""
              className="ms-2 scryfall-button"
              onMouseDown={(e) => handleButtonClick(e, "scryfall")}
              style={{ padding: "0" }}
            >
              <Image
                src={scryfallIcon}
                style={{ width: "50%", padding: "5px" }}
              />
            </Button>
          </Col>
          <Col md={4} style={{ padding: "0" }}>
            <Button
              variant=""
              className="ms-2 edhrec-button"
              onMouseDown={(e) => handleButtonClick(e, "edhrec")}
              style={{ padding: "0" }}
            >
              <Image
                src={edhrecIcon}
                style={{ width: "50%", padding: "5px" }}
              />
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
