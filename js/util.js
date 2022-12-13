export const getRandomInt = function (from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// eslint-disable-next-line no-unused-vars
const checkStringLength = (str, maxLength) => str.length <= maxLength;
