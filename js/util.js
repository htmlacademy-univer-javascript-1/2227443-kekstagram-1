const ESCAPE_KEY = 'Escape';

export const getRandomInt = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export const isEscapeKey = (keycode) => keycode === ESCAPE_KEY;
