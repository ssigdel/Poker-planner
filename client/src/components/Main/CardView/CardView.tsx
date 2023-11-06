import React from "react";

import Card from "./Card";

import { FIBONACCI_SERIES } from "../../../constants/constants";
import { CardViewProps } from "../../../models/card";

const CardView: React.FC<CardViewProps> = (props) => {
  const cardList = FIBONACCI_SERIES.map((item) => (
    <Card
      key={item.toString()}
      value={item}
      onClick={props.onCardClick}
      isCardContentVisible
      isCardDisabled={props.isValuePresent}
    />
  ));

  return (
    <div>
      <div className="sub-heading card-heading">Cards</div>
      <div className="card-container">{cardList}</div>
    </div>
  );
};

export default CardView;
