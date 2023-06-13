// Interface for user.
export interface User {
  id: string;
  name: string;
  value?: number;
}

// Interface for room.
export interface Room {
  name: string;
  users: {};
  avgValue?: number;
  hasRoundEnded: boolean;
}
