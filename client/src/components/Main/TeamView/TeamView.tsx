import React, { useState, useEffect } from "react";

import PersonIcon from "@material-ui/icons/Person";

import classnames from "classnames";

import { socket } from "../../../socket";

const TeamView: React.FC = () => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    socket.on("connectedUsers", (users) => {
      setUsers(users);
    });

    return () => {
      socket.off("connectedUsers");
    };
  }, []);

  return (
    <div className="team-wrapper">
      {users.map((item: any) => (
        <div
          className={classnames({
            user: true,
            "current-user": item.id === userId,
          })}
          key={item.id}>
          <PersonIcon className="user-icon" /> {item.name}
        </div>
      ))}
    </div>
  );
};

export default TeamView;
