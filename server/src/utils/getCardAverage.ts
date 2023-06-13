import { User } from "../model";

export const getCardAverage = (users: User[]) => {
  let cardSum: number;
  let count: number = 0;

  cardSum = users?.reduce((acc: any, item: any) => {
    if (item.value) {
      count += 1;
      return (acc += item?.value);
    }
    return acc;
  }, 0);

  let avgValue = Number(
    isNaN(cardSum / count) ? 0 : (cardSum / count).toFixed(2)
  );

  return avgValue;
};
