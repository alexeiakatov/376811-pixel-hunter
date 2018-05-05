import showScreen from './render.js';
import utils from './utils.js';
import gameData from './data/game-data.js';

import IntroView from './intro/intro-view.js';
import GreetingView from './greeting/greeting-view.js';
import RulesView from './rules/rules-view.js';

import Game1View from './game-1/game-1-view.js';
import Game2View from './game-2/game-2-view.js';
import Game3View from './game-3/game-3-view.js';

import FinalStatsView from './stats/final-stats-view';

// import stats from './stats.js';
// import elementFactory from './elementFactory.js';


const GameType = {
  ONE: 1,
  TWO: 2,
  THREE: 3
};

const introView = new IntroView();
introView.asteriskClickHandler = () => {
  goGreetingOrRules(`greeting`);
};

showScreen(introView.element);

const greetingView = new GreetingView();
greetingView.continueButtonClickHandler = () => {
  goGreetingOrRules(`rules`);
};

const rulesView = new RulesView();
rulesView.goButtonClickHandler = () => {
  goNextQuestion();
};

// ФУНКЦИЯ: переход к greetings или к rules.
const goGreetingOrRules = (where) => {
  switch (where) {
    case `greeting`:
      showScreen(greetingView.element);
      break;

    case `rules`:
      showScreen(rulesView.element);
      break;
  }
};

// ФУНКЦИЯ: переход к итоговой статистике.
const goFinalStats = () => {
  // gameData.calculateResultScore();
  gameData.getResultScore();
  let actualPlayerState = gameData.getPlayerState();
  let statsHistory = gameData.getStatsHistory();

  statsHistory.unshift(actualPlayerState);
  statsHistory.length = gameData.getStatsHistoryLength();

  showScreen(new FinalStatsView(gameData).element);
};

// ФУНКЦИЯ: колбэк для передачи в компонент - определяет действия, которые д.б. выполнены когда ответ(ы) на компоненте уже
// сделаны пользователем.
let onAnswerReady = (answerObjects) => {
  if (gameData.checkAnswer(answerObjects)) {
    goNextQuestion();
  } else {
    goFinalStats();
  }
};

let currentGameType = GameType.ONE;

// ФУНКЦИЯ: переход к следующему вопросу.
const goNextQuestion = () => {
  // gameData.showState();

  let currentQuestionNumber = gameData.getCurrentQuestionNumber();

  if (currentQuestionNumber >= gameData.getGameQuestionsCount()) {
    gameData.getPlayerState().win = true;
    goFinalStats();

  } else {
    let questions = gameData.getQuestions();

    switch (currentGameType) {

      case GameType.ONE:
        let firstQuestionIndex = utils.getRandomValue(0, questions.length - 1, 0);
        let secondQuestionIndex = utils.getRandomValue(0, questions.length - 1, 0);

        while (firstQuestionIndex === secondQuestionIndex) {
          secondQuestionIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }

        questions[firstQuestionIndex].index = firstQuestionIndex;
        questions[secondQuestionIndex].index = secondQuestionIndex;

        let game1View = new Game1View(gameData, firstQuestionIndex, secondQuestionIndex);

        game1View.onAnswerReady = onAnswerReady;

        showScreen(game1View.element);
        break;

      case GameType.TWO:
        let questionIndex = utils.getRandomValue(0, questions.length - 1, 0);
        questions[questionIndex].index = questionIndex;
        let game2View = new Game2View(gameData, questionIndex);

        game2View.onAnswerReady = onAnswerReady;

        showScreen(game2View.element);
        break;

      case GameType.THREE:
        // выбрать ПЕРВЫЙ вопрос из массива вопросов по random и чтоб его ответом было не рисунок, а фото.
        let firstPhotoIndex = utils.getRandomValue(0, questions.length - 1, 0);
        while (questions[firstPhotoIndex].pictureType === `paint`) {
          firstPhotoIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }
        questions[firstPhotoIndex].index = firstPhotoIndex;

        // выбрать ВТОРОЙ вопрос из массива вопросов по random и чтоб его индекс не был равным индексу первого вопроса,
        // и так же чтоб его ответом был не рисунок, а фото.
        let secondPhotoIndex = utils.getRandomValue(0, questions.length - 1, 0);
        while (secondPhotoIndex === firstPhotoIndex || questions[secondPhotoIndex].pictureType === `paint`) {
          secondPhotoIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }
        questions[secondPhotoIndex].index = secondPhotoIndex;

        // выбрать ТРЕТИЙ вопрос из массива вопросов по random и чтоб его ответом был рисунок а НЕ фото.
        let paintingIndex = utils.getRandomValue(0, questions.length - 1, 0);
        while (questions[paintingIndex].pictureType === `photo`) {
          paintingIndex = utils.getRandomValue(0, questions.length - 1, 0);
        }
        questions[paintingIndex].index = paintingIndex;

        // расставить индексы вопросов в массиве в случайном порядке
        let args = new Array(3);
        // на первый случайный индекс из 3ех возможных - записать первую фото
        let index1 = utils.getRandomValue(0, 2, 0);
        args[index1] = firstPhotoIndex;

        // на второй случайный индекс из 3ех возможных - записать вторую фото
        let index2 = utils.getRandomValue(0, 2, 0);
        while (index2 === index1) {
          index2 = utils.getRandomValue(0, 2, 0);
        }
        args[index2] = secondPhotoIndex;

        // на оставшееся пустое место в массиве записать рисунок
        for (let i = 0; i < args.length; i++) {
          if (!args[i]) {
            args[i] = paintingIndex;
          }
        }

        let game3View = new Game3View(gameData, ...args);

        game3View.onAnswerReady = onAnswerReady;

        showScreen(game3View.element);
        break;
    }
  }
  currentGameType = (currentGameType === GameType.THREE) ? 1 : ++currentGameType;
};

export default {
  goNextQuestion,
  goFinalStats,
  goGreetingOrRules
};
