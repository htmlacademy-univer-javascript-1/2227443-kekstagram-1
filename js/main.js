function getRandomInt(from, to) {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}
checkStringLength();

const MAX_ID_NUMBER = 25;
const MAX_URL_NUMBER = 25;
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
  'Очень красивая фотография',
  'я хейтер',
  'Ты фотошопишь фотографии или действительно такая красивая?',
  'Красивая фотография',
  'Некрасивая фотография'
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

const getRandomName = () => NAMES[getRandomInt(0, NAMES.length - 1)];
const getRandomDescription = () => DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)];
const getRandomMessage = () => MESSAGES[getRandomInt(0, MESSAGES.length - 1)];

const createComment = () => ({
  id: getRandomInt(1, 10000),
  avatar: `img/avatar-${getRandomInt(1, MAX_AVATARS_NUMBER)}.svg`,
  message: getRandomMessage,
  name: getRandomName
});

const createPhotoDescription = (id) => ({
  id: id,
  url: `photos/${getRandomInt(1, MAX_URL_NUMBER)}`,
  description: getRandomDescription,
  likes: getRandomInt(MIN_LIKES_NUMBER, MAX_LIKES_NUMBER),
  comments: Array.from({length: getRandomInt(1, 3)}, createComment)
});


const createPhotoDescriptions = () => {
  const photoDescriptions = [];
  for (let i = 0; i < MAX_ID_NUMBER; i++) {
    photoDescriptions.push(createPhotoDescription(i));
  }
  return photoDescriptions;
};

createPhotoDescriptions();
