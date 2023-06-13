import { Room } from "../model";

export const getUserCards = (room: Room) => {
  return {
    cardValues: Object.values(room.users),
    avgValue: room.avgValue,
    hasRoundEnded: room.hasRoundEnded,
  };
};
