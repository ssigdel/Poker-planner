import React from "react";

import { CardProps } from "../../../models/card";

import classnames from "classnames";

const Card: React.FC<CardProps> = (props) => {
  const cardClasses = classnames({
    card: true,
    disabled: props.isCardDisabled,
    hidden: !props.isCardContentVisible,
  });

  return (
    <div
      className={cardClasses}
      onClick={props.onClick?.bind(null, props?.value)}>
      {props.isCardContentVisible && (
        <span className="value">{props?.value}</span>
      )}
    </div>
  );
};

export default Card;
