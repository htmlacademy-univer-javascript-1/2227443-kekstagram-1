import {isEscapeKey} from './util.js';

const INIT_COMMENTS_COUNT = 5;
const COMMENTS_COUNT_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const likesCountElement = bigPicture.querySelector('.likes-count');
const commentsCountElement = bigPicture.querySelector('.comments-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const commentListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content
  .querySelector('.social__comment');

const buttonCloseElement = document.querySelector('#picture-cancel');

let currentComments;
let renderedComments;
let currentCommentsCount;

const createComment = ({avatar, name, message}) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = avatar;
  commentElement.querySelector('.social__picture').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const createComments = (commentsCount) => {
  const commentsFragment = document.createDocumentFragment();
  while (commentsCount > 0 && renderedComments !== currentCommentsCount) {
    const commentElement = createComment(currentComments[renderedComments]);
    commentsFragment.appendChild(commentElement);
    renderedComments++;
    commentsCount--;
  }
  if (renderedComments === currentCommentsCount) {
    commentsLoaderElement.classList.add('hidden');
  }
  commentsCountElement.textContent = `${renderedComments} из ${currentCommentsCount} комментариев`;
  commentListElement.appendChild(commentsFragment);
};

const onBigPictureKeydown = (evt) => {
  if (isEscapeKey(evt.key)) {
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  commentsCountElement.parentElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onBigPictureKeydown);
  buttonCloseElement.removeEventListener('click', closeBigPicture);
}

const onCommentsLoadButtonClick = () => {
  createComments(COMMENTS_COUNT_STEP);
};

export const showBigPicture = (url, likes, comments, description) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsCountElement.parentElement.classList.remove('hidden');

  bigPictureImg.src = url;
  likesCountElement.textContent = likes;
  bigPictureDescription.textContent = description;

  currentComments = comments;
  currentCommentsCount = currentComments.length;
  renderedComments = 0;
  commentListElement.textContent = '';
  commentListElement.innerHTML = '';

  if (currentComments.length <= INIT_COMMENTS_COUNT) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
    commentsLoaderElement.addEventListener('click', onCommentsLoadButtonClick);
  }

  const initCommentsCount = currentCommentsCount <= INIT_COMMENTS_COUNT ? currentCommentsCount : INIT_COMMENTS_COUNT;
  createComments(initCommentsCount);

  document.addEventListener('keydown', onBigPictureKeydown);
  buttonCloseElement.addEventListener('click', closeBigPicture, {once: true});
};


