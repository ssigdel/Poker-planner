import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Header from "./Header";
import Content from "./Content";
import UserFormDialog from "./UserFormDialog/UserFormDialog";

import { socket } from "../../socket";

export default function Main() {
  const [isOpen, setIsOpen] = useState(true);
  const [username, setUsername] = useState("");
  const { roomId } = useParams();

  const userId = localStorage.getItem("userId") ?? "";
  const isUserPresent = userId.length > 0;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    if (username.length > 0) {
      localStorage.setItem("userId", socket.id);
      socket.emit("joinRoom", roomId, { id: socket.id, name: username });
      handleClose();
    }
  };

  return (
    <div className="main-wrapper">
      <Header />
      <Content />
      {!isUserPresent ? (
        <UserFormDialog
          isOpen={isOpen}
          username={username}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      ) : (
        ""
      )}
    </div>
  );
}
