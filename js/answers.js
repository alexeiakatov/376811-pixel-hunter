import getElement from './elementFactory.js';

const GAME_TYPE_1 = 1;
const GAME_TYPE_2 = 2;
const GAME_TYPE_3 = 3;

const getAnswerElement = (gameType, imageUrl, questionNumber) => {
  let answerElement;

  if (gameType === GAME_TYPE_1 || gameType === GAME_TYPE_2) {
    imageUrl = imageUrl || `http://placehold.it/705x455`;
    questionNumber = questionNumber || 1;

    answerElement = getElement(`
        <div class="game__option">
        <img src="${imageUrl}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${questionNumber}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${questionNumber}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`);

  } else if (gameType === GAME_TYPE_3) {
    imageUrl = imageUrl || `http://placehold.it/304x455`;

    answerElement = getElement(`
        <div class="game__option">
          <img src="${imageUrl}" alt="Option 1" width="304" height="455">
        </div>`);
  }
  return answerElement.content;
};

export default getAnswerElement;
