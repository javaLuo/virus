import { BigNumber } from "bignumber.js/bignumber";

export default {
  toFixedPoint(x, y) {
    return new BigNumber(x).toFixed(+y, 1);
  },
  toFixedAuto(x) {
    return new BigNumber(x).toFixed();
  },
};
