import elementFactory from './elementFactory';
import showScreen from './render.js';

const EMPTY_HEADER = `empty`;
const INFO_HEADER = `info`;

const getHeaderElement = (headerType, data) => {
  let headerElement;

  switch (headerType) {
    case EMPTY_HEADER :
      headerElement = elementFactory.getElement(`
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
      </header>`);
      break;

    case INFO_HEADER :
      headerElement = elementFactory.getElement(` 
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
        <h1 class="game__timer">NN</h1>
        <div class="game__lives">
          <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
          <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
          <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
        </div>
      </header>`);
      break;
  }

  const backButtonElement = headerElement.querySelector(`.header .back`);

  // ОБРАБОТЧИК: клика по кнопке 'назад'
  if (backButtonElement) {
    backButtonElement.addEventListener(`click`, () => {
      showScreen(`greeting`);
    });
  }
  return headerElement;
};

export default getHeaderElement;
