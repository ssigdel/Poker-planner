import React from "react";

import Card from "../CardView/Card";
import TeamView from "../TeamView/TeamView";

import { Button } from "@mui/material";

import { BoardViewProps, UserCard } from "../../../models/card";

import isUserAdmin from "../../../utils/isUserAdmin";
import { useParams } from "react-router-dom";

const BoardView: React.FC<BoardViewProps> = (props) => {
  const { roomId } = useParams();
  const userId = localStorage.getItem("userId");

  const cardValues = props.room.cardValues.filter((item) => "value" in item);

  const checkForContentVisibility = (id: String): boolean => {
    if (id === userId || props.room.hasRoundEnded) {
      return true;
    }

    return false;
  };

  const checkIfValueEmpty = () => {
    return cardValues.length === 0;
  };

  return (
    <div className="board">
      <div className="board-content">
        <span className="sub-heading">Board</span>
        <div>
          {isUserAdmin(roomId) && (
            <Button
              className="button"
              disabled={checkIfValueEmpty()}
              onClick={props.onClick?.bind(null, 0)}
              variant="contained">
              {props.room.hasRoundEnded ? "New Round" : "End Round"}
            </Button>
          )}
        </div>
      </div>
      <TeamView />
      <div className="board-container">
        {cardValues.map((item: UserCard) => (
          <div className="board-card" key={item.id}>
            <Card
              value={item.value}
              isCardContentVisible={checkForContentVisibility(item?.id)}
            />
            <div className="card-user">{item?.name}</div>
          </div>
        ))}
        {props.room.avgValue !== 0 && (
          <span>Average: {props.room.avgValue}</span>
        )}
      </div>
    </div>
  );
};

export default BoardView;
