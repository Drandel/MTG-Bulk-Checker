import React from "react";
import { Accordion, Badge } from "react-bootstrap";
import RenderCardList from "./RenderCardList";

const pageCopy = {
  available: {
    key: "0",
    headerText: "Already Have",
    badgeColor: "success",
  },
  missing: {
    key: "1",
    headerText: "Missing",
    badgeColor: "danger",
  },
};

export default function CardBreakdown({ variant, data, canBuild }) {
  if (data.size === 0 || canBuild) {
    return null;
  }

  const copyVariant = pageCopy[variant];

  return (
    <Accordion activeKey={copyVariant.key} className="mt-3" alwaysOpen>
      {/* Cards Already Owned */}
      <Accordion.Item eventKey={copyVariant.key} alwaysopen="true">
        <Accordion.Header>
          {copyVariant.headerText}:
          <Badge bg={copyVariant.badgeColor} className="ms-2">
            {data.size} card
            {data.size !== 1 && "s"}
          </Badge>
        </Accordion.Header>
        <Accordion.Body className="p-0">
          <RenderCardList cardMap={data} type={variant} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
