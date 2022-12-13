import {photos} from './data.js';

const pictureTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const pictureListFragment = document.createDocumentFragment();

const createPicture = () => {
  photos.forEach(({url, likes, comments}) => {
    const photoElement = pictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('.picture__likes').textContent = likes;

    pictureListFragment.appendChild(photoElement);
  });
};

export const renderPictures = () => {
  createPicture();
  document.querySelector('.pictures').appendChild(pictureListFragment);
};
