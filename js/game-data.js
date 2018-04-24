const FAST_ANSWER_LIMIT = 10000;
const SLOW_ANSWER_LIMIT = 20000;

const CORRECT_ANSWER_SCORE = 100;
const FAST_ANSWER_BONUS = 50;
const SLOW_ANSWER_PENNALTY = -50;
const SAVED_LIFE_BONUS = 50;

const GAME_QUESTIONS_COUNT = 10;
const STATES_HISTORY_LENGTH = 5;
let currentQuestionNumber = 0;

import mockStates from './mockStates.js';
const statsHistory = [
  mockStates.isFail,
  mockStates.savedLives,
  mockStates.notAnswered,
  mockStates.slowAnswers,
  mockStates.fastAnswers
];

// ВОПРОСЫ
const questions = [
  {imageUrl: `https://k42.kn3.net/CF42609C8.jpg`, pictureType: `paint`}, // девушка держит голову на подбородке
  {imageUrl: `http://i.imgur.com/1KegWPz.jpg`, pictureType: `photo`}, // музыкант с гитарой
  {imageUrl: `https://k42.kn3.net/D2F0370D6.jpg`, pictureType: `paint`}, // баран
  {imageUrl: `http://i.imgur.com/DKR1HtB.jpg`, pictureType: `photo`}, // сосна в снегу
  {imageUrl: `https://k32.kn3.net/5C7060EC5.jpg`, pictureType: `paint`}, // побережье города
  {imageUrl: `https://i.imgur.com/DiHM5Zb.jpg`, pictureType: `photo`} // кот
];

// СОСТОЯНИЕ ИГРОКА
let playerState = {
  win: null,
  remainingLives: 3,
  baseScore: 0,
  fastAnswers: 0,
  slowAnswers: 0,
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

// ГЕТТЕР для stateHistory[].
const getStatsHistory = () => statsHistory;

// ГЕТТЕР для STATES_HISTORY_LENGTH.
const getStatsHistoryLength = () => STATES_HISTORY_LENGTH;

// ГЕТТЕР И СЕТТЕР для currentQuestionNumber
const getCurrentQuestionNumber = () => currentQuestionNumber;
const setCurrentQuestionNumber = (newNumber) => currentQuestionNumber = newNumber;

// Показать состояние
const showState = () => {
  console.log(`*** PLAYER STATE: ***`);
  console.log(`  currentQuestionNumber: `, currentQuestionNumber);
  for (let key in playerState) {
    if (key === `answers`) {
      console.log(`  answers: `);
      playerState[key].forEach((answer, index) => {
        console.log(`    `, index, `isCorrect: `, answer.isCorrect, `; speed: `, answer.speed, `; time: `, answer.time);
      });

    } else {
      console.log(`  `, key, `: `, playerState[key]);
    }
  }
  console.log(`**********************`);
};
// ФУНКЦИЯ: проверить полученные ответы на вопрос.
// { object } answer
const checkAnswer = (answer) => {
  let correctAnswer = questions[parseInt(answer.questionIndex, 10)].pictureType;
  let isCorrect = answer.answer === correctAnswer;

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
    remainingLives: 3,
    baseScore: 0,
    fastAnswers: 0,
    slowAnswers: 0,
    totalScore: 0,
    answers: []
  };
  currentQuestionNumber = 0;
};
// ФУНКЦИЯ: получить итоговый результат игры.
const getResultScore = () => {
  if (playerState.answers.length < 10) {
    return -1;
  }

  for (const value of playerState.answers) {
    if (value.isCorrect) {
      playerState.baseScore += CORRECT_ANSWER_SCORE;
      playerState.totalScore += CORRECT_ANSWER_SCORE;

      if (value.time < FAST_ANSWER_LIMIT) {
        playerState.totalScore += FAST_ANSWER_BONUS;
        playerState.fastAnswers++;

      } else if (value.time > SLOW_ANSWER_LIMIT) {
        playerState.totalScore += SLOW_ANSWER_PENNALTY;
        playerState.slowAnswers++;
      }
    }
  }

  playerState.totalScore += playerState.remainingLives > 0 ? SAVED_LIFE_BONUS * playerState.remainingLives : 0;
  return playerState.totalScore;
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
  getStatsHistory,
  getStatsHistoryLength,
  clearPlayerState,
  showState,
  getCurrentQuestionNumber,
  setCurrentQuestionNumber
};
