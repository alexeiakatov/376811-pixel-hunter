const FAST_ANSWER_LIMIT = 10000;
const SLOW_ANSWER_LIMIT = 20000;

const FAST_ANSWER_SCORE = 150;
const NORMAL_ANSWER_SCORE = 100;
const SLOW_ANSWER_SCORE = 50;

export const getResultScore = (playerAnswers, remainingLives) => {
  if (playerAnswers.length < 10) {
    return -1;
  }

  let resultScore = 0;
  for (const value of playerAnswers) {
    if (value.isCorrect) {
      if (value.time < FAST_ANSWER_LIMIT) {
        resultScore += FAST_ANSWER_SCORE;
      } else if (value.time > SLOW_ANSWER_LIMIT) {
        resultScore += SLOW_ANSWER_SCORE;
      } else {
        resultScore += NORMAL_ANSWER_SCORE;
      }
    }
  }

  resultScore += remainingLives > 0 ? 50 * remainingLives : 0;
  return resultScore;
};

export const getTimer = (workPeriod) => {

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
