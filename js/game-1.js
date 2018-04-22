import elementFactory from './elementFactory.js';
import showScreen from './render.js';

const getGame1Element = () => {
  const game1Template = `
    <div class="component" data-name="header" data-type="info"></div>
    <div class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    
      <!-- ФОРМА С 2мя ВОПРОСАМИ И ВАРИАНТАМИ ОТВЕТОВ в ней д.б. 2 варианта ответа -->
      <form class="game__content">
        <div class="component" data-name="answer" data-type="1" data-option-number="1"></div>    
        <div class="component" data-name="answer" data-type="1" data-option-number="2"></div>    
      </form>
    
      <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНУТРИ-ИГРОВОЙ СТАТИСТИКИ -->
      <div class="component" data-name="inGameStats"></div>
    </div>
`;

  const game1Element = elementFactory.getElement(game1Template);
  elementFactory.checkAndAddComponents(game1Element);

  const form = game1Element.querySelector(`.game__content`);

  const questionInputElements = form.querySelectorAll(`input`);
  let checkedCount;

  // ОБРАБОТЧИК: события 'change' на форме. Для обработки кликов-ответов на вопросы question1 и question2.
  form.addEventListener(`change`, (evt) => {
    checkedCount = 0;
    questionInputElements.forEach((element) => {
      if (element.name === evt.target.name) {
        element.disabled = true;
      }
      if (element.checked) {
        ++checkedCount;
      }
    });

    if (checkedCount === 2) {
      showScreen(`game2`);
    }
  });

  return game1Element;
};

export default getGame1Element;

