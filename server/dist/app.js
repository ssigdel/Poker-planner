"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = require("dotenv");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const getUserCards_1 = require("./utils/getUserCards");
const getCardAverage_1 = require("./utils/getCardAverage");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8080;
const server = http_1.default.createServer(app);
let rooms = {};
const io = new socket_io_1.Server(server, { cors: { origin: process.env.CLIENT_APP } });
// Allow requests only from a specific origin
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_APP,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
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
    socket.on("joinRoom", (roomName, user) => {
        socket.join(roomName);
        let room = rooms[roomName];
        if (!room) {
            room = { name: roomName, users: {}, hasRoundEnded: false };
        }
        room = Object.assign(Object.assign({}, room), { users: Object.assign(Object.assign({}, room.users), { [socket.id]: Object.assign(Object.assign({}, user), { id: socket.id }) }) });
        rooms = Object.assign(Object.assign({}, rooms), { [roomName]: room });
        io.to(roomName).emit("connectedUsers", Object.values(room.users));
    });
    //Called on user selects a card.
    socket.on("cardValue", (roomName, userId, value) => {
        let room = rooms[roomName];
        if (room) {
            let user = room.users[userId];
            if (user) {
                user = Object.assign(Object.assign({}, user), { value });
                room = Object.assign(Object.assign({}, room), { users: Object.assign(Object.assign({}, room.users), { [userId]: user }), avgValue: 0 });
                rooms = Object.assign(Object.assign({}, rooms), { [roomName]: room });
                io.to(roomName).emit("userCards", (0, getUserCards_1.getUserCards)(room));
            }
        }
    });
    //Called when the admin ends the round.
    socket.on("endRound", (roomName) => {
        let room = rooms[roomName];
        if (room) {
            let users = Object.values(room.users);
            const avgValue = (0, getCardAverage_1.getCardAverage)(users);
            room = Object.assign(Object.assign({}, room), { avgValue, hasRoundEnded: true });
            rooms = Object.assign(Object.assign({}, rooms), { [roomName]: room });
            io.to(roomName).emit("userCards", (0, getUserCards_1.getUserCards)(room));
        }
    });
    //Called when new round is created.
    socket.on("newRound", (roomName) => {
        let room = rooms[roomName];
        if (room) {
            let users = {};
            let userList = Object.values(room.users);
            userList.forEach((item) => {
                delete item["value"];
                users[item === null || item === void 0 ? void 0 : item.id] = Object.assign({}, item);
            });
            room = Object.assign(Object.assign({}, room), { users, avgValue: 0, hasRoundEnded: false });
            rooms = Object.assign(Object.assign({}, rooms), { [roomName]: room });
            io.to(roomName).emit("userCards", (0, getUserCards_1.getUserCards)(room));
        }
    });
    //Called when user leaves the room.
    socket.on("leaveRoom", (roomName, userId) => {
        let room = rooms[roomName];
        if (room) {
            let { users } = room;
            delete users[userId];
            room = Object.assign(Object.assign({}, room), { users });
            rooms = Object.assign(Object.assign({}, rooms), { [roomName]: room });
            io.to(roomName).emit("connectedUsers", Object.values(room.users));
        }
    });
});
server.listen(PORT, () => console.log(`Listening to the server at port: ${PORT}`));
