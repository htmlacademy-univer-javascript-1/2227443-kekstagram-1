import {isEscapeKey} from './util.js';
import {pristine} from './validate.js';

const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const closeFormButton = document.querySelector('#upload-cancel');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt.key) && evt.target !== textHashtags && evt.target !== textDescription) {
    closeOverlay();
  }
};

function closeOverlay() {
  imageUploadForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeydown);
  closeFormButton.removeEventListener('click', closeOverlay);
}

export const createPostImageForm = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });

  fileUploadButton.addEventListener('change', () => {
    document.addEventListener('keydown', onEscKeydown);
    closeFormButton.addEventListener('click', closeOverlay, {once: true});
    document.body.classList.add('modal-open');
    overlay.classList.remove('hidden');
  });
};
