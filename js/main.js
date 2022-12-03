function getRandomInt(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

getRandomInt(0, 10);
checkStringLength('1234567', 7);

