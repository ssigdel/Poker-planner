import { User } from "../model";

export const getCardAverage = (users: User[]) => {
  let [cardSum, count] = users.reduce(
    (acc: [number, number], user: User) => {
      if (user.value) {
        acc[1] += 1;
        acc[0] += user?.value;

        return acc;
      }
      return acc;
    },
    [0, 0]
  );

  let avgValue = Number(
    isNaN(cardSum / count) ? 0 : (cardSum / count).toFixed(2)
  );

  return avgValue;
};
