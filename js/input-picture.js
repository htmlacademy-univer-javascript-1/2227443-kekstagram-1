const VALID_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const DEFAULT_PHOTO = 'img/upload-default-image.jpg';

const imgInput = document.querySelector('.img-upload__input');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const resetFileInput = () => {
  imgInput.value = '';
  imgPreview.src = DEFAULT_PHOTO;
  effectsPreview.forEach((preview) => {
    preview.style.removeProperty('background-image');
  });
};

const onImgInputChange = (evt) => {
  const file = evt.target.files[0];
  const fileName = file.name.toLowerCase();
  const isFormatValid = VALID_TYPES.some((type) => fileName.endsWith(type));
  if (isFormatValid) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${reader.result}')`;
      });
    });
    reader.readAsDataURL(file);
    return;
  }
  resetFileInput();
};

export {onImgInputChange};
