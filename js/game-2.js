import elementFactory from './elementFactory.js';
import showScreen from './render.js';

const getGame2Element = () => {
  const game2Template = `
    <div class="component" data-name="header" data-type="info"></div>
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
  
      <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ - в ней д.б. 1 вариант ответа -->
      <form class="game__content  game__content--wide">
        <div class="component" data-name="answer" data-type="2" data-option-number="1"></div>
      </form>
    
      <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНЕТРИИГРОВОЙ СТАТИСТИКИ - элементы д.б. получены из модуля inGameStats.js -->
      <div class="component" data-name="inGameStats"></div>
    </div>
  `;

  const game2Element = elementFactory.getElement(game2Template);
  elementFactory.checkAndAddComponents(game2Element);

  const form = game2Element.querySelector(`.game__content`);

  // ОБРАБОТЧИК: события 'change' на форме с вопросами.
  form.addEventListener(`change`, () => {
    showScreen(`game3`);
  });

  return game2Element;
};

export default getGame2Element;


