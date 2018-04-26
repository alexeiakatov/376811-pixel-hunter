let isFail = {
  win: false,
  remainingLives: 0,
  baseScore: 0,
  fastAnswers: 0,
  slowAnswers: 0,
  totalScore: 0,
  answers: [
    {isCorrect: false, speed: `fast`, time: 9000},
    {isCorrect: true, speed: `fast`, time: 8000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: false, speed: `slow`, time: 27000},
    {isCorrect: true, speed: `slow`, time: 25000},
    {isCorrect: true, speed: `slow`, time: 22000},
    {isCorrect: true, speed: `correct`, time: 17000},
    {isCorrect: false, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 14000},
    {isCorrect: false, speed: ``, time: -1}
  ]
};

let savedLives = {
  win: true,
  remainingLives: 3,
  baseScore: 1000,
  fastAnswers: 0,
  slowAnswers: 0,
  totalScore: 1150,
  answers: [
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 8000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 31000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 17000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 14000},
    {isCorrect: true, speed: `correct`, time: -1}
  ]
};

let fastAnswers = {
  win: true,
  remainingLives: 0,
  baseScore: 1000,
  fastAnswers: 5,
  slowAnswers: 0,
  totalScore: 1250,
  answers: [
    {isCorrect: true, speed: `fast`, time: 9000},
    {isCorrect: true, speed: `correct`, time: 18000},
    {isCorrect: true, speed: `fast`, time: 8000},
    {isCorrect: true, speed: `correct`, time: 11000},
    {isCorrect: true, speed: `fast`, time: 7000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `fast`, time: 7000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `fast`, time: 4000},
    {isCorrect: true, speed: `correct`, time: 12000}
  ]
};

let slowAnswers = {
  win: true,
  remainingLives: 0,
  baseScore: 1000,
  fastAnswers: 0,
  slowAnswers: 5,
  totalScore: 750,
  answers: [
    {isCorrect: true, speed: `slow`, time: 9000},
    {isCorrect: true, speed: `correct`, time: 8000},
    {isCorrect: true, speed: `slow`, time: 8000},
    {isCorrect: true, speed: `correct`, time: 31000},
    {isCorrect: true, speed: `slow`, time: 7000},
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 17000},
    {isCorrect: true, speed: `slow`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 14000},
    {isCorrect: true, speed: `slow`, time: -1}
  ]
};

let notAnswered = {
  win: false,
  remainingLives: 0,
  baseScore: 0,
  fastAnswers: 0,
  slowAnswers: 0,
  totalScore: 0,
  answers: [
    {isCorrect: true, speed: `correct`, time: 12000},
    {isCorrect: true, speed: `correct`, time: 8000},
    {isCorrect: false, speed: ``, time: 12000},
    {isCorrect: false, speed: ``, time: 31000},
    {isCorrect: false, speed: ``, time: 12000},
    {isCorrect: false, speed: ``, time: 12000},
  ]
};
export default {
  isFail,
  savedLives,
  fastAnswers,
  slowAnswers,
  notAnswered
};
