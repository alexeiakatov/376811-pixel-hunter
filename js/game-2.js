import elementFactory from './elementFactory.js';
import main from './main.js';
import gameData from './game-data.js';

const getGame2Element = (question) => {
  question = JSON.stringify(question);

  const game2Template = `
    <div class="component" data-name="header" data-type="info"></div>
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
  
      <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ - в ней д.б. 1 вариант ответа -->
      <form class="game__content  game__content--wide">
        <div class="component" data-name="answerOption" data-type="2" data-option-number="1" data-question=${question}></div>
      </form>
    
      <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНЕТРИИГРОВОЙ СТАТИСТИКИ - элементы д.б. получены из модуля inGameStats.js -->
      <div class="component" data-name="inGameStats"></div>
    </div>
  `;

  const game2Element = elementFactory.getElement(game2Template);
  elementFactory.checkAndAddComponents(game2Element);

  const form = game2Element.querySelector(`.game__content`);

  // ОБРАБОТЧИК: события 'change' на форме с вопросами.
  form.addEventListener(`change`, (evt) => {
    let answer = {
      questionIndex: evt.target.dataset.questionIndex,
      answer: evt.target.value
    };

    if (gameData.checkAnswer(answer)) {
      main.goNextQuestion();
    } else {
      main.goFinalStats();
    }
  });

  return game2Element;
};

export default getGame2Element;


