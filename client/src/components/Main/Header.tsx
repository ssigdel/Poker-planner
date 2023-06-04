import React from "react";

import { useNavigate, useParams } from "react-router-dom";

import LogoutIcon from "@material-ui/icons/ExitToApp";

import { socket } from "../../socket";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const disconnect = () => {
    const userId = localStorage.getItem("userId");
    socket.emit("leaveRoom", roomId, userId);
    socket.disconnect();
    navigate("/");

    localStorage.removeItem("userId");
  };

  return (
    <div className="header-wrapper">
      <div className="header">Poker Planner</div>
      <div className="quit" onClick={disconnect}>
        <LogoutIcon className="quit-icon" /> Quit
      </div>
    </div>
  );
};

export default Header;
