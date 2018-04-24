import elementFactory from './elementFactory.js';
import main from './main.js';

const getIntroElement = () => {
  const introTemplateString = `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>
`;

  const introElement = elementFactory.getElement(introTemplateString);

  // ОБРАБОТЧИК: клика на астерикс
  introElement.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
    main.goGreetingOrRules(`greeting`);
  });

  return introElement;
};

export default getIntroElement;
