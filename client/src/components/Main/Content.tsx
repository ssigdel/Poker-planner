import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import CardView from "./CardView/CardView";
import BoardView from "./BoardView/BoardView";

import { socket } from "../../socket";

import isUserValuePresent from "../../utils/isUserValuePresent";

const Content: React.FC = () => {
  const [isValuePresent, setIsValuePresent] = useState(false);
  const [room, setRoom] = useState({
    cardValues: [],
    avgValue: 0,
    hasRoundEnded: false,
  });
  const { roomId } = useParams();

  useEffect(() => {
    socket.on("userCards", (room) => {
      const userId = localStorage.getItem("userId");
      const isValuePresent = isUserValuePresent(userId, room.cardValues);

      setRoom(room);
      setIsValuePresent(isValuePresent);
    });

    return () => {
      socket.off("userCards");
    };
  }, []);

  const onCardClick = (item: number) => {
    const userId = localStorage.getItem("userId");

    socket.emit("cardValue", roomId, userId, item);
  };

  const handleEndRound = () => {
    socket.emit("endRound", roomId);
  };

  const handleNewRound = () => {
    socket.emit("newRound", roomId);
  };

  const onButtonClick = () => {
    if (room.hasRoundEnded) {
      handleNewRound();

      return;
    }

    handleEndRound();
  };

  return (
    <div className="body-wrapper">
      <div className="content-wrapper">
        <BoardView room={room} onClick={onButtonClick} />
        <CardView onCardClick={onCardClick} isValuePresent={isValuePresent} />
      </div>
    </div>
  );
};

export default Content;
