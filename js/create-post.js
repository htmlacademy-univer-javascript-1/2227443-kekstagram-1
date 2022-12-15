import {isEscapeKey} from './util.js';

const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const closeFormButton = document.querySelector('#upload-cancel');

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;

const HASHTAG_REGEX = new RegExp('^#[0-9A-Za-zА-Яа-яЁё]{1,19}$');

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}, true);

function isHashtagValid(hashtag) {
  return HASHTAG_REGEX.test(hashtag);
}

const isHashtagsValid = (value) => {
  if (value.length === 0) {
    return true;
  }
  const hashtags = value.split(' ');
  return hashtags.every(isHashtagValid);
};

const checkHashtags = (hashtags) => isHashtagsValid(hashtags);

const hasDuplicates = (hashtags) => new Set(hashtags).size !== hashtags.length;

const checkHashtagUniqueness = (hashtagInput) => {
  const hashtags = hashtagInput.split(' ');
  const keys = hashtags.map((hashtag) => hashtag.toLowerCase());
  return !hasDuplicates(keys);
};

const checkComments = (comment) => comment.length <= MAX_COMMENT_LENGTH;

const checkHashtagsCount = (hashtagInput) => {
  const hashtags = hashtagInput.split(' ');
  return hashtags.length <= MAX_HASHTAGS_COUNT;
};

pristine.addValidator(
  textHashtags,
  checkHashtagsCount,
  `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэш-тегов`
);

pristine.addValidator(
  textHashtags,
  checkHashtags,
  'Хэш-тег должен начинаться с символа # и состоять из букв и чисел\n' +
  `Максимальная длина одного хэш-тега ${MAX_HASHTAG_LENGTH} символов, включая решётку`
);

pristine.addValidator(
  textHashtags,
  checkHashtagUniqueness,
  'Хэш-теги должны быть уникальны'
);

pristine.addValidator(
  textDescription,
  checkComments,
  `Максимальная длина комментария ${MAX_COMMENT_LENGTH} символов`
);

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

export const createPostImageForm = function () {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });

  fileUploadButton.addEventListener('change', () => {
    document.addEventListener('keydown', onEscKeydown);
    closeFormButton.addEventListener('click', closeOverlay, {once: true});
    document.body.classList.add('modal-open');
    overlay.classList.remove('hidden');
  });
};
