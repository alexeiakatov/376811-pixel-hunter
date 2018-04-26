import elementFactory from './elementFactory.js';
import main from './main.js';
import gameData from './game-data.js';

const getGame3Element = (question1, question2, question3) => {
  question1 = JSON.stringify(question1);
  question2 = JSON.stringify(question2);
  question3 = JSON.stringify(question3);

  const game3Template = `
    <div class="component" data-name="header" data-type="info"></div>
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
    
      <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ - в ней д.б. 3 варианта ответа -->
      <form class="game__content  game__content--triple">
        <div class="component" data-name="answerOption" data-type="3" data-option-number="1" data-question=${question1}></div>
        <div class="component" data-name="answerOption" data-type="3" data-option-number="2" data-question=${question2}></div>
        <div class="component" data-name="answerOption" data-type="3" data-option-number="3" data-question=${question3}></div>
      </form>
      
      <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНУТРИ-ИГРОВОЙ СТАТИСТИКИ -->
      <div class="component" data-name="inGameStats"></div>
    </div>
  `;

  const game3Element = elementFactory.getElement(game3Template);
  elementFactory.checkAndAddComponents(game3Element);

  const form = game3Element.querySelector(`.game__content`);

  // ОБРАБОТЧИК: клика на одном из ответов (div.game__option)
  form.addEventListener(`click`, (evt) => {
    let answer = {
      questionIndex: evt.target.dataset.questionIndex,
      answer: `paint`
    };

    if (gameData.checkAnswer(answer)) {
      main.goNextQuestion();
    } else {
      main.goFinalStats();
    }

  });

  return game3Element;
};

export default getGame3Element;
