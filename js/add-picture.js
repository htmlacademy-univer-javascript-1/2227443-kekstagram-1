import {showBigPicture} from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content
  .querySelector('.picture');

const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
let loadedPhotos;

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
    const clickedPhoto = loadedPhotos.find(
      ({id}) => Number(pictureElement. dataset.id) === id);
    showBigPicture(clickedPhoto);
  }
};

export const renderPictures = (photos) => {
  photos.forEach(createPictureElement);
  loadedPhotos = photos;
  pictureListElement.appendChild(pictureListFragment);
  pictureListElement.addEventListener('click', onPictureClick);
};
