import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

export default function RenderCardList({ cardMap, type }) {
  if (cardMap.size === 0) return null;

  // Configuration object for different card types
  const config = {
    missing: {
      primaryBadge: (info) => ({
        bg: "danger",
        text: `Missing: ${info.shortage}`,
        className: "me-1",
      }),
      secondaryBadge: (info) =>
        info.owned > 0
          ? {
              bg: "secondary",
              text: `Have: ${info.owned}`,
            }
          : null,
    },
    available: {
      primaryBadge: (info) => ({
        bg: "success",
        text: `Have: ${info.owned}`,
        className: "me-1",
      }),
      secondaryBadge: (info) => ({
        bg: info.needed > info.owned ? "danger" : "secondary",
        text: `Need: ${info.needed}`,
      }),
    },
  };

  const currentConfig = config[type];
  if (!currentConfig) return null;

  return (
    <ListGroup variant="flush">
      {Array.from(cardMap.entries()).map(([cardName, info]) => {
        const primaryBadge = currentConfig.primaryBadge(info);
        const secondaryBadge = currentConfig.secondaryBadge(info);

        return (
          <ListGroup.Item
            key={cardName}
            className="d-flex justify-content-between align-items-center"
            action
          >
            <span className="fw-medium">{cardName}</span>
            <div className="text-end">
              <Badge
                bg={primaryBadge.bg}
                className={primaryBadge.className || ""}
              >
                {primaryBadge.text}
              </Badge>
              {secondaryBadge && (
                <Badge bg={secondaryBadge.bg}>{secondaryBadge.text}</Badge>
              )}
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
