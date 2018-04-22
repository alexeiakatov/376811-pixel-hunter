const FAST_ANSWER_LIMIT = 10000;
const SLOW_ANSWER_LIMIT = 20000;

const CORRECT_ANSWER_SCORE = 100;
const FAST_ANSWER_BONUS = 50;
const SLOW_ANSWER_PENNALTY = -50;
const SAVED_LIFE_BONUS = 50;

let GAME_QUESTIONS_COUNT = 10;

let playerState = {
  win: true,
  remainingLives: 2,
  baseScore: 0,
  fastAnswers: 0,
  slowAnswers: 0,
  totalScore: 0
};

const playerAnswers = [
  {isCorrect: true, speed: `fast`, time: 9000},
  {isCorrect: true, speed: `fast`, time: 8000},
  {isCorrect: true, speed: `correct`, time: 12000},
  {isCorrect: true, speed: `slow`, time: 27000},
  {isCorrect: true, speed: `slow`, time: 25000},
  {isCorrect: true, speed: `slow`, time: 22000},
  {isCorrect: true, speed: `correct`, time: 17000},
  {isCorrect: true, speed: `correct`, time: 12000},
  {isCorrect: true, speed: `correct`, time: 14000},
  {isCorrect: false, speed: ``, time: -1}
];

// ГЕТТЕР для playerAnswers.
const getPlayerAnswers = () => playerAnswers;

// ГЕТТЕР для GAME_QUESTIONS_COUNT.
const getGameQuestionsCount = () => GAME_QUESTIONS_COUNT;

// ГЕТТЕР для playerState
const getPlayerState = () => playerState;

// ФУНКЦИЯ: добавить еще один ответ пользователя.
const addAnswer = () => {

};

// ФУНКЦИЯ: получить итоговый результат игры.
const getResultScore = () => {
  if (playerAnswers.length < 10 || !playerState.win) {
    return -1;
  }

  for (const value of playerAnswers) {
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
  addAnswer,
  getGameQuestionsCount,
  getResultScore,
  getTimer,
  getPlayerState
};
