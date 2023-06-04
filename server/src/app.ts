import http from "http";
import { config } from "dotenv";
import { Server } from "socket.io";

import express, { Application } from "express";

config();

const app: Application = express();

const PORT: Number = Number(process.env.PORT) || 8080;

const server = http.createServer(app);

interface User {
  id: string;
  name: string;
  value?: number;
}

interface Room {
  name: string;
  users: {};
  avgValue?: number;
  hasRoundEnded: boolean;
}

let rooms: any = {};

const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

io.on("connect", (socket) => {
  //Create room.
  socket.on("createRoom", () => {
    socket.join(socket.id);
  });

  //Emit room name.
  socket.emit("roomName", socket.id);

  //Called when user gets disconnected.
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  //Called on user joins the room.
  socket.on("joinRoom", (roomName: string, user: User) => {
    socket.join(roomName);

    let room = rooms[roomName];
    if (!room) {
      room = { name: roomName, users: {} };
      rooms[roomName] = room;
    }
    room.users[socket.id] = { ...user, id: socket.id };

    io.to(roomName).emit("connectedUsers", Object.values(room.users));
  });

  //Called on user selects a card.
  socket.on("cardValue", (roomName: string, userId: string, value: number) => {
    let room = rooms[roomName];

    if (room) {
      let user = room.users[userId];

      if (user) {
        user = { ...user, value };

        room.users[userId] = user;
        room.avgValue = 0;
        room.hasRoundEnded = false;

        io.to(roomName).emit("userCards", {
          cardValues: Object.values(room.users),
          avgValue: room.avgValue,
          hasRoundEnded: room.hasRoundEnded,
        });
      }
    }
  });

  //Called when the admin ends the round.
  socket.on("endRound", (roomName: string) => {
    let cardSum;
    let room = rooms[roomName];

    if (room) {
      let users: User[] = Object.values(room.users);
      let count = 0;

      cardSum = users?.reduce((acc: any, item: any) => {
        if (item.value) {
          count += 1;
          return (acc += item?.value);
        }
        return acc;
      }, 0);

      let avgValue = (cardSum / count).toFixed(2);

      room = { ...room, avgValue, hasRoundEnded: true };

      rooms = { ...rooms, roomName: room };

      io.to(roomName).emit("userCards", {
        cardValues: Object.values(room.users),
        avgValue: room.avgValue,
        hasRoundEnded: room.hasRoundEnded,
      });
    }
  });

  //Called when new round is created.
  socket.on("newRound", (roomName: string) => {
    let room = rooms[roomName];

    if (room) {
      let users: any = {};

      let userList: User[] = Object.values(room.users);

      userList.forEach((item) => {
        delete item["value"];
        users[item?.id] = { ...item };
      });

      room = { ...room, users, avgValue: 0, hasRoundEnded: false };

      rooms = { ...rooms, [roomName]: room };

      io.to(roomName).emit("userCards", {
        cardValues: Object.values(room.users),
        avgValue: room.avgValue,
        hasRoundEnded: room.hasRoundEnded,
      });
    }
  });

  //Called on user leaves the room.
  socket.on("leaveRoom", (roomName: string, userId: string) => {
    let room = rooms[roomName];

    if (room) {
      let users: any = {};
      let userList: User[] = Object.values(room.users);

      userList = userList.filter((u: User) => u.id !== userId);

      userList.forEach((item) => {
        users[item?.id] = { ...item, value: 0 };
      });

      room = {
        ...room,
        users,
      };

      rooms = { ...rooms, [roomName]: room };

      io.to(roomName).emit("connectedUsers", Object.values(room.users));
    }
  });
});

server.listen(PORT, () =>
  console.log(`Listening to the server at port: ${PORT}`)
);
