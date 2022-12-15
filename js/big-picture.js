import {isEscapeKey} from './util.js';

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


const createComments = function (comments) {
  commentListElement.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').textContent = message;

    commentsFragment.appendChild(commentElement);
  });

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

export const showBigPicture = function (url, likes, comments, description) {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  commentsCountElement.parentElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');

  bigPictureImg.src = url;
  likesCountElement.textContent = likes;
  commentsCountElement.textContent = comments.length;
  createComments(comments);
  bigPictureDescription.textContent = description;

  document.addEventListener('keydown', onBigPictureKeydown);
  buttonCloseElement.addEventListener('click', closeBigPicture, {once: true});
};


