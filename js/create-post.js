import {isEscapeKey} from './util.js';
import {pristine} from './validate.js';
import {resetScale, renderPreview} from './scale-control.js';
import {renderSlider, resetEffect} from './effects-for-picture.js';
import {sendData} from './api.js';

const form = document.querySelector('#upload-select-image');
const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const closeFormButton = document.querySelector('#upload-cancel');

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');
const submitFormElement = form.querySelector('.img-upload__submit');

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt.key) && evt.target !== textHashtags && evt.target !== textDescription) {
    closeOverlay();
  }
};

const resetAll = () => {
  imageUploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

function closeOverlay() {
  resetAll();
  document.removeEventListener('keydown', onEscKeydown);
  closeFormButton.removeEventListener('click', closeOverlay);
}

const createPostImageForm = () => {
  renderSlider();
  fileUploadButton.addEventListener('change', () => {
    renderPreview();
    document.addEventListener('keydown', onEscKeydown);
    closeFormButton.addEventListener('click', closeOverlay, {once: true});
    document.body.classList.add('modal-open');
    overlay.classList.remove('hidden');
  });
};

const createSuccessBlock = () => {
  const successCopy = successTemplate.cloneNode(true).content.querySelector('.success');

  successCopy.addEventListener(
    'click',
    (evt) => {
      if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
        document.body.removeChild(successCopy);
        closeOverlay();
      }
    });
  document.body.appendChild(successCopy);
};

const createErrorBlock = (text) => {
  const errorCopy = errorTemplate.cloneNode(true).content.querySelector('.error');
  errorCopy.querySelector('.error__title').textContent = text;

  errorCopy.addEventListener(
    'click',
    (evt) => {
      if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
        document.body.removeChild(errorCopy);
      }
    });
  document.body.appendChild(errorCopy);
};

export const renderFileUpload = () => {
  imageUploadForm.addEventListener('submit',
    (evt) => {
      evt.preventDefault();
      const isValid = pristine.validate();
      if (isValid) {
        submitFormElement.textContent = 'Опубликовать';
        sendData(
          createErrorBlock,
          createSuccessBlock,
          new FormData(form));
        closeOverlay();
      } else {
        submitFormElement.textContent = 'Проверьте введенные данные...';
      }
    });
  createPostImageForm();
  resetEffect();
  resetScale();
};
