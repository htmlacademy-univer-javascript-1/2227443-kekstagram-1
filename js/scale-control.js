const STEP = 25;
const MAX_SCALE = 100;
const MIN_SCALE = 25;
const DEFAULT_SCALE = 100;

const scaleValueElement = document.querySelector('.scale__control--value');
const scaleControl = document.querySelector('.img-upload__scale');
const imagePreview = document.querySelector('.img-upload__preview');

const changeScale = (evt) => {
  const valueInt = parseInt(
    scaleValueElement.value.replace('%', ''),
    10
  );

  if (evt.target.closest('.scale__control--smaller') && valueInt > MIN_SCALE) {
    scaleValueElement.value = `${valueInt - STEP}%`;
    imagePreview.style.transform = `scale(${(valueInt - STEP) / 100})`;
  } else if (evt.target.closest('.scale__control--bigger') && valueInt < MAX_SCALE) {
    scaleValueElement.value = `${valueInt + STEP}%`;
    imagePreview.style.transform = `scale(${(valueInt + STEP) / 100})`;
  }
};

export const renderPreview = () => {
  imagePreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  scaleValueElement.value = `${DEFAULT_SCALE}%`;
  scaleControl.addEventListener('click', changeScale);
};

export const resetScale = () => {
  scaleControl.removeEventListener('click', changeScale);
};
