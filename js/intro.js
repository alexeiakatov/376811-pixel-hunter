import getElement from './elementFactory.js';
import showScreen from './render';
import {setHeaderType} from './game-data.js';

const getIntroElement = () => {
  setHeaderType(null);

  const introTemplateString =
    `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

  const introElement = getElement(introTemplateString).content;

  // ОБРАБОТЧИК: клика на астерикс
  introElement.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
    showScreen(`greeting`);
  });

  return introElement;
};

export default getIntroElement;
