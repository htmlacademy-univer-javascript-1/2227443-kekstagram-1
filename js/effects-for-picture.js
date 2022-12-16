import {EFFECTS} from './data.js';

const DEFAULT_EFFECT = 'none';

const previewImage = document.querySelector('.img-upload__preview');
const effects = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderField = document.querySelector('.img-upload__effect-level');
let selectedEffect = DEFAULT_EFFECT;

const applyEffect = () => {
  previewImage.classList.add(`effects_preview--${selectedEffect}`);
  previewImage.style.filter = DEFAULT_EFFECT;
  effectLevelValue.value = slider.noUiSlider.get();
  if (selectedEffect === DEFAULT_EFFECT) {
    sliderField.classList.add('hidden');
    return;
  }
  sliderField.classList.remove('hidden');
  slider.noUiSlider.updateOptions(EFFECTS[selectedEffect].noui);
  previewImage.style.filter = EFFECTS[selectedEffect].filter(slider.noUiSlider.get());
};

export const resetEffect = () => {
  selectedEffect = DEFAULT_EFFECT;
  applyEffect();
};

const onEffectChange = (evt) => {
  const effectElement = evt.target.closest('.effects__radio');
  if (effectElement) {
    selectedEffect = evt.target.value;
    applyEffect();
  }
};

const onMoveSlider = () => {
  effectLevelValue.value = slider.noUiSlider.get();
  if (selectedEffect !== DEFAULT_EFFECT) {
    previewImage.style.filter = EFFECTS[selectedEffect].filter(slider.noUiSlider.get());
  }
};

export const renderSlider = () => {
  sliderField.classList.add('hidden');
  noUiSlider.create(
    slider, {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
      connect: 'lower',
    }
  );
  applyEffect();
  effects.addEventListener('change', onEffectChange);
  slider.noUiSlider.on('update', onMoveSlider);
};
