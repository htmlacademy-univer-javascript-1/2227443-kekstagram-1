function getRandomInt(from, to) {
  if (from < 0 || to < 0) {
    return NaN;
  } else if (to < from) {
    return NaN;
  } else if (from === to) {
    return from;
  }
  return from + Math.floor(Math.random() * (to - from + 1));
}

function checkString(str, maxLength) {
  return str.length <= maxLength;
}

getRandomInt(0, 10);
checkString('1234567', 7);

