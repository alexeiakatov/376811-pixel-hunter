import showScreen from './render';
import utils from './utils.js';
import gameData from './game-data.js';

import getIntroElement from './intro.js';
import getGreetingElement from "./greeting";
import getRulesElement from "./rules";
import getGame1Element from './game-1.js';
import getGame2Element from './game-2.js';
import getGame3Element from "./game-3";
import stats from './stats.js';

showScreen(getIntroElement());

const GAME_TYPE_1 = 1;
const GAME_TYPE_2 = 2;
const GAME_TYPE_3 = 3;


// ФУНКЦИЯ: переход к greetings или к rules.
const goGreetingOrRules = (where) => {
  switch (where) {
    case `greeting`:
      showScreen(getGreetingElement());
      break;

    case `rules`:
      showScreen(getRulesElement());
      break;
  }
};

// ФУНКЦИЯ: переход к итоговой статистике.
const goFinalStats = () => {
  gameData.getResultScore();
  let actualPlayerState = gameData.getPlayerState();
  let statsHistory = gameData.getStatsHistory();

  statsHistory.unshift(actualPlayerState);
  statsHistory.length = gameData.getStatsHistoryLength();

  showScreen(stats.getFinalStatsElement(statsHistory));
};

let currentGameType = GAME_TYPE_1;

// ФУНКЦИЯ: переход к следующему вопросу.
const goNextQuestion = () => {
  // gameData.showState();

  let currentQuestionNumber = gameData.getCurrentQuestionNumber();
  if (currentQuestionNumber === gameData.getGameQuestionsCount() - 2) {
    currentGameType = GAME_TYPE_1;
  }

  if (currentQuestionNumber >= gameData.getGameQuestionsCount()) {
    gameData.getPlayerState().win = true;
    goFinalStats();

  } else {
    let questions = gameData.getQuestions();

    switch (currentGameType) {
      case GAME_TYPE_1:
        let firstIndex = utils.getRandomValue(0, questions.length - 1, 0);
        let secondIndex = utils.getRandomValue(0, questions.length - 1, 0);

        while (firstIndex === secondIndex) {
          secondIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }
        questions[firstIndex].index = firstIndex;
        questions[secondIndex].index = secondIndex;
        showScreen(getGame1Element(questions[firstIndex], questions[secondIndex]));
        break;

      case GAME_TYPE_2:
        let index = utils.getRandomValue(0, questions.length - 1, 0);
        questions[index].index = index;
        showScreen(getGame2Element(questions[index]));
        break;

      case GAME_TYPE_3:
        // выбрать случайную первую фото из массива вопросов
        let photoFirstIndex = utils.getRandomValue(0, questions.length - 1, 0);
        while (questions[photoFirstIndex].pictureType === `painting`) {
          photoFirstIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }

        // выбрать случайную вторую фото из массива вопросов
        let photoSecondIndex = utils.getRandomValue(0, questions.length - 1, 0);
        while (photoSecondIndex === photoFirstIndex || questions[photoSecondIndex].pictureType === `painting`) {
          photoSecondIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }

        // выбрать случайный рисунок из массива вопросов
        let paintingIndex = utils.getRandomValue(0, questions.length - 1, 0);
        while (questions[paintingIndex].pictureType === `photo`) {
          paintingIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }

        // создать случайную расстановку вопросов
        let args = new Array(3);
        // на первый случайный индекс из 3 записать первую фото
        let index1 = utils.getRandomValue(0, 2, 0);
        args[index1] = questions[photoFirstIndex];

        // на второй случайный индекс из 3 записать вторую фото
        let index2 = utils.getRandomValue(0, 2, 0);
        while (index2 === index1) {
          index2 = utils.getRandomValue(0, 2, 0);
        }
        args[index2] = questions[photoSecondIndex];

        // на оставшееся пустое место в массиве записать рисунок
        for (let i = 0; i < args.length; i++) {
          if (!args[i]) {
            args[i] = questions[paintingIndex];
          }
        }
        questions[photoFirstIndex].index = photoFirstIndex;
        questions[photoSecondIndex].index = photoSecondIndex;
        questions[paintingIndex].index = paintingIndex;

        showScreen(getGame3Element(...args));
        break;
    }
  }
  currentGameType = (currentGameType === GAME_TYPE_3) ? 1 : ++currentGameType;
};

export default {
  goNextQuestion,
  goFinalStats,
  goGreetingOrRules
};
