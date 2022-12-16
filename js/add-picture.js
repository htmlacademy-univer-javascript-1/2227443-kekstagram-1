import {pictures} from './data.js';
import {showBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

const createPictureElement = ({id, url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.dataset.id = id;
  pictureListFragment.appendChild(pictureElement);
};

const onPictureClick = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (pictureElement) {
    const clickedPhoto = pictures.find(
      ({id}) => Number(pictureElement. dataset.id) === id);
    showBigPicture(clickedPhoto);
  }
};

export const renderPictures = () => {
  pictures.forEach(createPictureElement);
  pictureListElement.appendChild(pictureListFragment);
  pictureListElement.addEventListener('click', onPictureClick);
};
