"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCardAverage = void 0;
const getCardAverage = (users) => {
    let [cardSum, count] = users.reduce((acc, user) => {
        if (user.value) {
            acc[1] += 1;
            acc[0] += user === null || user === void 0 ? void 0 : user.value;
            return acc;
        }
        return acc;
    }, [0, 0]);
    let avgValue = Number(isNaN(cardSum / count) ? 0 : (cardSum / count).toFixed(2));
    return avgValue;
};
exports.getCardAverage = getCardAverage;
