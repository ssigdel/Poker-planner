import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { socket } from "../../socket";

import RoomFormDialog from "../Main/RoomFormDialog/RoomFormDialog";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ room: "", name: "" });
  const [isRoomDialogOpen, setIsRoomDialogOpen] = useState(false);

  const handleCreateButtonClick = () => {
    connect();

    socket.emit("createRoom");

    navigateToMainPage();
  };

  const navigateToMainPage = () => {
    socket.on("roomName", (room) => {
      navigate(`/room/${room}`);
    });
  };

  const handleJoinButtonClick = () => {
    setIsRoomDialogOpen(true);
    connect();
  };

  const connect = () => {
    socket.connect();
  };

  const handleClose = () => {
    setIsRoomDialogOpen(false);
  };

  const handleSubmit = () => {
    localStorage.setItem("userId", socket.id);

    socket.emit("joinRoom", user.room, { id: socket.id, name: user.name });

    handleClose();

    navigate(`/room/${user.room}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <div className="home-wrapper">
      <div className="main-heading">
        Poker <span className="text">Planner</span>
      </div>
      <div className="description">
        Create or join a room and plan your task wisely!
      </div>
      <div className="btn-container">
        <Button variant="contained" onClick={handleCreateButtonClick}>
          Create Room
        </Button>
        <span className="option">or</span>
        <Button variant="contained" onClick={handleJoinButtonClick}>
          Join Room
        </Button>
      </div>
      <RoomFormDialog
        isOpen={isRoomDialogOpen}
        user={user}
        handleClose={handleClose}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Home;
