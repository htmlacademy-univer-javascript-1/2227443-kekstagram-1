import {getRandomInt} from './util.js';

const PHOTOS_NUMBER = 25;
const MIN_LIKES_NUMBER = 15;
const MAX_LIKES_NUMBER = 200;
const MAX_AVATARS_NUMBER = 6;

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'красивая фотография',
  'это я',
  'ставьте лайки!',
  'Красивая фотография',
  'Некрасивая фотография',
  'В кекстаграм я лучше, чем в Инстаграм',
  'не придумал описание'
];

const NAMES = [
  'Аарон',
  'Абрам',
  'Аваз',
  'Аввакум',
  'Август',
  'Августа',
  'Августин',
  'Августина',
  'Авдей',
  'Авдий',
  'Авдотья'
];

const getRandomArrayElement = (array) => array[getRandomInt(0, array.length - 1)];

let commentIndex = 1;
const createComment = () => ({
  id: commentIndex++,
  avatar: `img/avatar-${getRandomInt(1, MAX_AVATARS_NUMBER)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

const photos = Array.from({length: PHOTOS_NUMBER }).map((value, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
  comments: Array.from({length: getRandomInt(1, 3)}).map(() => createComment())
}));

export {photos};
