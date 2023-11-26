"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCards = void 0;
const getUserCards = (room) => {
    return {
        cardValues: Object.values(room.users),
        avgValue: room.avgValue,
        hasRoundEnded: room.hasRoundEnded,
    };
};
exports.getUserCards = getUserCards;
