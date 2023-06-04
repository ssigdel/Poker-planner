export type CardProps = {
  value: number;
  isCardDisabled?: boolean;
  isCardContentVisible?: boolean;
  onClick?: (item: number) => void;
};

export type CardViewProps = {
  isValuePresent: boolean;
  onCardClick: (item: number) => void;
};

export type HomeProps = {
  isConnected: boolean;
};

export type UserCard = {
  id: string;
  name: string;
  value: number;
};

type RoomProps = {
  cardValues: UserCard[];
  avgValue: number;
  hasRoundEnded: boolean;
};

export type BoardViewProps = {
  room: RoomProps;
  onClick: () => void;
};
