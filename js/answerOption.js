import elementFactory from './elementFactory.js';

const GAME_TYPE_1 = `1`;
const GAME_TYPE_2 = `2`;
const GAME_TYPE_3 = `3`;

const getAnswerOptionElement = (gameType, optionNumber, question) => {
  question = JSON.parse(question);
  let answerElement;

  if (gameType === GAME_TYPE_1 || gameType === GAME_TYPE_2) {

    let imageUrl = question.imageUrl || `http://placehold.it/705x455`;
    optionNumber = optionNumber || 1;

    answerElement = elementFactory.getElement(`
      <div class="game__option">
        <img src="${imageUrl}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${optionNumber}" type="radio" value="photo" data-question-index="${question.index}">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${optionNumber}" type="radio" value="paint" data-question-index="${question.index}">
          <span>Рисунок</span>
        </label>
      </div>
    `);
  } else if (gameType === GAME_TYPE_3) {
    let imageUrl = question.imageUrl || `http://placehold.it/304x455`;
    optionNumber = optionNumber || 1;

    answerElement = elementFactory.getElement(`
        <div class="game__option" data-question-index="${question.index}">
          <img src="${imageUrl}" alt="Option ${optionNumber}" width="304" height="455">
        </div>`);
  }
  return answerElement;
};

export default getAnswerOptionElement;
