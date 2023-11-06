import http from "http";
import { config } from "dotenv";
import { Server } from "socket.io";

import express, { Application } from "express";

import { User, Room } from "./model";
import { getUserCards } from "./utils/getUserCards";
import { getCardAverage } from "./utils/getCardAverage";

config();

const app: Application = express();

const PORT: number = Number(process.env.PORT) || 8080;

const server = http.createServer(app);

let rooms: any = {};

const io = new Server(server, { cors: { origin: process.env.CLIENT_APP } });

io.on("connect", (socket) => {
  //Create room.
  socket.on("createRoom", () => {
    socket.emit("roomName", socket.id);
  });

  //Called when user gets disconnected.
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  //Called when user joins the room.
  socket.on("joinRoom", (roomName: string, user: User) => {
    socket.join(roomName);

    let room: Room = rooms[roomName];

    if (!room) {
      room = { name: roomName, users: {}, hasRoundEnded: false };
    }

    room = {
      ...room,
      users: { ...room.users, [socket.id]: { ...user, id: socket.id } },
    };

    rooms = { ...rooms, [roomName]: room };

    io.to(roomName).emit("connectedUsers", Object.values(room.users));
  });

  //Called on user selects a card.
  socket.on("cardValue", (roomName: string, userId: string, value: number) => {
    let room = rooms[roomName];

    if (room) {
      let user: User = room.users[userId];

      if (user) {
        user = { ...user, value };

        room = {
          ...room,
          users: { ...room.users, [userId]: user },
          avgValue: 0,
        };

        rooms = { ...rooms, [roomName]: room };

        io.to(roomName).emit("userCards", getUserCards(room));
      }
    }
  });

  //Called when the admin ends the round.
  socket.on("endRound", (roomName: string) => {
    let room: Room = rooms[roomName];

    if (room) {
      let users: User[] = Object.values(room.users);

      const avgValue = getCardAverage(users);

      room = { ...room, avgValue, hasRoundEnded: true };

      rooms = { ...rooms, [roomName]: room };

      io.to(roomName).emit("userCards", getUserCards(room));
    }
  });

  //Called when new round is created.
  socket.on("newRound", (roomName: string) => {
    let room: Room = rooms[roomName];

    if (room) {
      let users: any = {};

      let userList: User[] = Object.values(room.users);

      userList.forEach((item) => {
        delete item["value"];
        users[item?.id] = { ...item };
      });

      room = { ...room, users, avgValue: 0, hasRoundEnded: false };

      rooms = { ...rooms, [roomName]: room };

      io.to(roomName).emit("userCards", getUserCards(room));
    }
  });

  //Called when user leaves the room.
  socket.on("leaveRoom", (roomName: string, userId: string) => {
    let room = rooms[roomName];

    if (room) {
      let { users } = room;

      delete users[userId];

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
