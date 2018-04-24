import elementFactory from './elementFactory';
import main from './main.js';
import gameData from './game-data.js';

const EMPTY_HEADER = `empty`;
const INFO_HEADER = `info`;

const getHeaderElement = (headerType) => {
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
      let livesElementStrings = [];
      let lives = gameData.getRemainingLives();
      for (let i = 0; i < 3; i++){
        if (i < lives) {
          livesElementStrings.push(`
          <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
        `);
        } else {
          livesElementStrings.push(`
          <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
        `);
        }
      }
      let livesElementTemplate = livesElementStrings.reverse().join(``);

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
          ${livesElementTemplate}
        </div>
      </header>`);
      break;
  }

  const backButtonElement = headerElement.querySelector(`.header .back`);

  // ОБРАБОТЧИК: клика по кнопке 'назад'
  if (backButtonElement) {
    backButtonElement.addEventListener(`click`, () => {
      main.goGreetingOrRules(`greeting`);
    });
  }
  return headerElement;
};

export default getHeaderElement;
