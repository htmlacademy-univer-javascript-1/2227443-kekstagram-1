import {photos} from './data.js';
import {showBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const createPicture = () => {
  photos.forEach(({url, likes, comments, description}) => {
    const photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;

    photoElement.addEventListener('click', () => {
      showBigPicture(url, likes, comments, description);
    });

    pictureListFragment.appendChild(photoElement);
  });
};

export const renderPictures = () => {
  createPicture();
  document.querySelector('.pictures').appendChild(pictureListFragment);
};
