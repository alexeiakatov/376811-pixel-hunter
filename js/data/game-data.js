import mockStates from '../mockStates.js';

const FAST_ANSWER_LIMIT = 10000;
const SLOW_ANSWER_LIMIT = 20000;

const CORRECT_ANSWER_SCORE = 100;
const FAST_ANSWER_BONUS = 50;
const SLOW_ANSWER_PENNALTY = -50;
const SAVED_LIFE_BONUS = 50;

const GAME_QUESTIONS_COUNT = 10;
const STATES_HISTORY_LENGTH = 3;
const ALL_LIVES = 3;

let currentQuestionNumber = 0;

const statsHistory = [
  mockStates.isFail
  // mockStates.savedLives,
  // mockStates.notAnswered,
  // mockStates.slowAnswers,
  // mockStates.fastAnswers
];

// ВОПРОСЫ
const questions = [
  {imageUrl: `https://k42.kn3.net/CF42609C8.jpg`, pictureType: `paint`}, // девушка держит голову подбородком на ладонях
  {imageUrl: `http://i.imgur.com/1KegWPz.jpg`, pictureType: `photo`}, // музыкант с гитарой
  {imageUrl: `https://k42.kn3.net/D2F0370D6.jpg`, pictureType: `paint`}, // баран
  {imageUrl: `http://i.imgur.com/DKR1HtB.jpg`, pictureType: `photo`}, // сосна в снегу
  {imageUrl: `https://k32.kn3.net/5C7060EC5.jpg`, pictureType: `paint`}, // побережье города
  {imageUrl: `https://i.imgur.com/DiHM5Zb.jpg`, pictureType: `photo`} // кот
];

// СОСТОЯНИЕ ИГРОКА
let playerState = {
  win: null,
  remainingLives: ALL_LIVES,
  savedLivesBonus: 0,
  baseScore: 0,
  fastAnswers: 0,
  fastAnswersBonus: 0,
  slowAnswers: 0,
  slowAnswersPennalty: 0,
  totalScore: 0,
  answers: []
};

// ГЕТТЕР для playerAnswers.
const getPlayerAnswers = () => playerState.answers;

// ГЕТТЕР для GAME_QUESTIONS_COUNT.
const getGameQuestionsCount = () => GAME_QUESTIONS_COUNT;

// ГЕТТЕР для playerState
const getPlayerState = () => playerState;

// ГЕТТЕР для questions
const getQuestions = () => questions;

// ГЕТТЕР для remainingLives
const getRemainingLives = () => playerState.remainingLives;

// ГЕТТЕР для ALL_LIVES
const getAllLives = () => ALL_LIVES;

// ГЕТТЕР для stateHistory[].
const getStatsHistory = () => statsHistory;

// ГЕТТЕР для STATES_HISTORY_LENGTH.
const getStatsHistoryLengthLimit = () => STATES_HISTORY_LENGTH;

// ГЕТТЕР для получения состояния из истории по индексу
const getStateFromHistory = (index) => {
  return statsHistory[index];
};

// ГЕТТЕР И СЕТТЕР для currentQuestionNumber
const getCurrentQuestionNumber = () => currentQuestionNumber;
const setCurrentQuestionNumber = (newNumber) => {
  currentQuestionNumber = newNumber;
};

// Показать состояние
const showState = () => {
//   console.log(`*** PLAYER STATE: ***`);
//   console.log(`  currentQuestionNumber: `, currentQuestionNumber);
//   for (let key in playerState) {
//     if (key === `answers`) {
//       console.log(`  answers: `);
//       playerState[key].forEach((answer, index) => {
//         console.log(`    `, index, `isCorrect: `, answer.isCorrect, `; speed: `, answer.speed, `; time: `, answer.time);
//       });
//
//     } else {
//       console.log(`  `, key, `: `, playerState[key]);
//     }
//   }
//   console.log(`**********************`);
};

// ФУНКЦИЯ: проверить полученные ответы на вопрос.
// @param { Array } answers
// @returns { boolean } - true - если жизни еще есть и можно продолжать игру, false - если жизней больше нет и продолжать игру нельзя.
const checkAnswer = (answers) => {
  let isCorrect = true;

  for (const answer of answers) {
    let correctAnswer = questions[parseInt(answer.questionIndex, 10)].pictureType;
    if (answer.answer !== correctAnswer) {
      isCorrect = false;
      break;
    }
  }

  playerState.remainingLives = isCorrect ? playerState.remainingLives : --playerState.remainingLives;

  let canGoNextQuestion = false;

  if (playerState.remainingLives >= 0) {
    playerState.answers.push({
      isCorrect,
      speed: `correct`,
      time: 14000
    });
    currentQuestionNumber++;
    canGoNextQuestion = true;
  } else {
    playerState.win = false;
  }

  return canGoNextQuestion;
};

// ФУНКЦИЯ: обнулить текущее состояние в playerState.
const clearPlayerState = () => {
  playerState = {
    win: null,
    remainingLives: ALL_LIVES,
    savedLivesBonus: 0,
    baseScore: 0,
    fastAnswers: 0,
    fastAnswersBonus: 0,
    slowAnswers: 0,
    slowAnswersPennalty: 0,
    totalScore: 0,
    answers: []
  };
  currentQuestionNumber = 0;
};
// ФУНКЦИЯ: получить итоговый результат игры.
const getResultScore = () => {
  return (playerState.win && playerState.totalScore > 0) ? playerState.totalScore : -1;
};

let calculateFinalStats = function () {
  if (playerState.answers.length < GAME_QUESTIONS_COUNT) {
    // вернет false, если вычисление итоговой статистике не было выполнено. Возникает когда количество ответов меньше чем
    // определено в настройках игры (эта ситуация может возникнуть, если игрок проиграл).
    return false;
  }

  for (const answer of playerState.answers) {
    if (answer.isCorrect) {
      playerState.baseScore += CORRECT_ANSWER_SCORE;
      playerState.totalScore += CORRECT_ANSWER_SCORE;

      if (answer.speed === `fast`) {
        playerState.totalScore += FAST_ANSWER_BONUS;
        playerState.fastAnswersBonus += FAST_ANSWER_BONUS;
        playerState.fastAnswers++;

      } else if (answer.speed === `slow`) {
        playerState.totalScore += SLOW_ANSWER_PENNALTY;
        playerState.slowAnswersPennalty += SLOW_ANSWER_PENNALTY;
        playerState.slowAnswers++;
      }
    }
  }

  playerState.savedLivesBonus = playerState.remainingLives > 0 ? SAVED_LIFE_BONUS * playerState.remainingLives : 0;
  playerState.totalScore += playerState.savedLivesBonus;

  // вернет true, если высичление итоговой статистики было выполнено
  return true;
};


// ТАЙМЕР
const getTimer = (workPeriod) => {

  const timerObj = {
    timeLeft: workPeriod,
    intervalId: null,
    isFinished: false,

    start() {
      if (!this.isFinished) {
        this.intervalId = setInterval(() => {
          this.tick();
        }, 1000);
      }
    },

    tick() {
      if (this.timeLeft > 1) {
        this.timeLeft--;

      } else {
        this.stop();
        this.isFinished = true;
      }
    },

    stop() {
      clearInterval(this.intervalId);
    },

    getTime() {
      return this.timeLeft;
    }
  };

  return timerObj;
};

export default {
  getPlayerAnswers,
  checkAnswer,
  getGameQuestionsCount,
  getResultScore,
  getTimer,
  getPlayerState,
  getQuestions,
  getRemainingLives,
  getAllLives,
  getStatsHistory,
  getStatsHistoryLengthLimit,
  clearPlayerState,
  showState,
  getCurrentQuestionNumber,
  setCurrentQuestionNumber,
  calculateFinalStats,
  getStateFromHistory
};
