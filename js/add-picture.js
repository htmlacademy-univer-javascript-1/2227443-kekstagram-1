import {pictures} from './data.js';
import {showBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const createPictureElement = ({url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  pictureElement.addEventListener('click', () => {
    showBigPicture(url, likes, comments, description);
  });
  pictureListFragment.appendChild(pictureElement);
};

export const renderPictures = () => {
  pictures.forEach(createPictureElement);
  document.querySelector('.pictures').appendChild(pictureListFragment);
};
