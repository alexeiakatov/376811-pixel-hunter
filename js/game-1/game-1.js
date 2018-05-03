import elementFactory from './elementFactory.js';
import gameData from './game-data.js';
import main from './main.js';

// { Object } question1, question2.
const getGame1Element = (question1, question2) => {
  question1 = JSON.stringify(question1);
  question2 = JSON.stringify(question2);

  const game1Template = `
    <div class="component" data-name="header" data-type="info"></div>
    <div class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    
      <!-- ФОРМА С 2мя ВОПРОСАМИ И ВАРИАНТАМИ ОТВЕТОВ в ней д.б. 2 варианта ответа -->
      <form class="game__content">
        <div class="component" data-name="answerOption" data-type="1" data-option-number="1" data-question=${question1}></div>    
        <div class="component" data-name="answerOption" data-type="1" data-option-number="2" data-question=${question2}></div>    
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

    let answer = {
      questionIndex: evt.target.dataset.questionIndex,
      answer: evt.target.value
    };

    if (gameData.checkAnswer(answer)) {
      if (checkedCount === 2) {
        main.goNextQuestion();
      }
    } else {
      main.goFinalStats();
    }
  });

  return game1Element;
};

export default getGame1Element;

