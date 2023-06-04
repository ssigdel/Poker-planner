import { UserCard } from "../models/card";

const isUserValuePresent: (userId: String | null, cardValues: []) => boolean = (
  userId,
  cardValues
) => {
  return cardValues.some(
    (item: UserCard) => item.id === userId && item.value && item.value !== 0
  );
};

export default isUserValuePresent;
