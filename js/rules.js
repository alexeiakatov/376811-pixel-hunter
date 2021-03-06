import elementFactory from './elementFactory.js';
import main from './main.js';

const getRulesElement = () => {
  const rulesTemplate = `
  <div class="component" data-name="header" data-type="empty"></div>

  <div class="rules">
    <h1 class="rules__title">Правила</h1>
    <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
      src="img/photo_icon.png" width="16" height="16"> или рисунок <img
      src="img/paint_icon.png" width="16" height="16" alt="">.<br>
      Фотографиями или рисунками могут быть оба изображения.<br>
      На каждую попытку отводится 30 секунд.<br>
      Ошибиться можно не более 3 раз.<br>
      <br>
      Готовы?
    </p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </div>
`;

  const rulesElement = elementFactory.getElement(rulesTemplate);
  elementFactory.checkAndAddComponents(rulesElement);

  const goButtonElement = rulesElement.querySelector(`.rules__button`);
  const rulesInputElement = rulesElement.querySelector(`.rules__input`);

  goButtonElement.disabled = true;

  // ОБРАБОТЧИК: клика по кнопке 'GO'
  goButtonElement.addEventListener(`click`, () => {
    main.goNextQuestion();
  });

  // ОБРАБОТЧИК: события 'change' у input для имени
  rulesInputElement.addEventListener(`input`, (evt) => {
    goButtonElement.disabled = (evt.target.value && evt.target.value.length > 0) ? false : true;
  });

  return rulesElement;
};

export default getRulesElement;
