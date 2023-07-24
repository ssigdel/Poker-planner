import React from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@material-ui/core";
import { ExitToApp, FileCopyOutlined } from "@material-ui/icons";

import { socket } from "../../socket";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const disconnect = () => {
    const userId = localStorage.getItem("userId");
    socket.emit("leaveRoom", roomId, userId);
    socket.disconnect();
    navigate("/");

    localStorage.removeItem("userId");
  };

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId?.toString() ?? "");
  };

  const copyRoomUrl = () => {
    const roomUrl = window.location.origin + location.pathname;
    navigator.clipboard.writeText(roomUrl);
  };

  return (
    <div className="header-wrapper">
      <div className="header">Poker Planner</div>

      <div className="link-buttons">
        <Button
          size="small"
          variant="outlined"
          className="button"
          onClick={copyRoomUrl}
          startIcon={<FileCopyOutlined />}
        >
          Copy Room Link
        </Button>
        <Button
          size="small"
          className="button"
          variant="outlined"
          onClick={copyRoomId}
          startIcon={<FileCopyOutlined />}
        >
          Copy Room ID
        </Button>
      </div>

      <div className="quit" onClick={disconnect}>
        <ExitToApp className="quit-icon" /> Quit
      </div>
    </div>
  );
};

export default Header;
