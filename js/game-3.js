import elementFactory from './elementFactory.js';
import showScreen from './render.js';

const getGame3Element = () => {
  const game3Template = `
    <div class="component" data-name="header" data-type="info"></div>
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
    
      <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ - в ней д.б. 3 варианта ответа -->
      <form class="game__content  game__content--triple">
        <div class="component" data-name="answer" data-type="3" data-option-number="1"></div>
        <div class="component" data-name="answer" data-type="3" data-option-number="2"></div>
        <div class="component" data-name="answer" data-type="3" data-option-number="3"></div>
      </form>
      
      <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНУТРИ-ИГРОВОЙ СТАТИСТИКИ -->
      <div class="component" data-name="inGameStats"></div>
    </div>
  `;

  const game3Element = elementFactory.getElement(game3Template);
  elementFactory.checkAndAddComponents(game3Element);

  const form = game3Element.querySelector(`.game__content`);

  // ОБРАБОТЧИК: клика на одном из ответов (div.game__option)
  form.addEventListener(`click`, () => {
    showScreen(`finalStats`);
  });

  return game3Element;
};

export default getGame3Element;
