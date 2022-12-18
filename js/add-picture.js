import {showBigPicture} from './big-picture.js';
import {getRandomUniquePhotos, debounce} from './util.js';

const RANDOM_PICTURE_COUNT = 10;
const TIMEOUT_DELAY = 500;

const pictureListElement = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();
const filterButtons = document.querySelectorAll('.img-filters__button');
const imgFilters = document.querySelector('.img-filters');
const pictureTemplate = document.querySelector('#picture').content
  .querySelector('.picture');
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
      ({id}) => Number(pictureElement.dataset.id) === id);
    showBigPicture(clickedPhoto);
  }
};

const renderPictures = (photos, option) => {
  document.querySelectorAll('.picture')
    .forEach((photo) => photo.remove());
  if (option === 'filter-default') {
    photos.forEach(createPictureElement);
  } else if (option === 'filter-random') {
    getRandomUniquePhotos(photos, RANDOM_PICTURE_COUNT).forEach(createPictureElement);
  } else {
    const photosSorted = Array.from(photos);
    photosSorted.sort((a, b) => b.comments.length - a.comments.length);
    photosSorted.forEach(createPictureElement);
  }

  loadedPhotos = photos;
  pictureListElement.appendChild(pictureListFragment);
  pictureListElement.addEventListener('click', onPictureClick);
};

const debounceRenderedPhotos = debounce(renderPictures, TIMEOUT_DELAY);
const createEventListenersFilter = () => {
  imgFilters.classList.remove('img-filters--inactive');
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      filterButtons.forEach((button) =>
        button.classList.remove('img-filters__button--active'));
      filterButton.classList.add('img-filters__button--active');
      debounceRenderedPhotos(loadedPhotos, filterButton.id);
    });
  });
};

export {renderPictures, createEventListenersFilter};
