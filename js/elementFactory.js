import getHeaderElememt from './header.js';
import getAnswerElement from './answers.js';
import gameData from './game-data.js';
import getIntroElement from './intro.js';
import getGreetingElement from './greeting.js';
import getRulesElement from './rules.js';
import getGame1Element from './game-1.js';
import getGame2Element from './game-2.js';
import getGame3Element from './game-3';
import stats from './stats.js';


const getElement = (templateString) => {
  let templateElement = document.createElement(`template`);
  templateElement.innerHTML = templateString;
  return templateElement.content;
};

const _prepareParams = (elementDataset) => {
  let params = [];

  for (let key in elementDataset) {
    if (key !== `name`) {
      params.push(elementDataset[key]);
    }
  }
  return params;
};

const _insertComponent = (stub, componentElement) => {
  if (stub.dataset.name === `scoreDescription`) {
    console.log(`check parent: `, componentElement.previousElementSibling);
  }

  if (componentElement) {
    stub.parentNode.replaceChild(componentElement, stub);
  }
};

const checkAndAddComponents = (element) => {
  const componenStubs = element.querySelectorAll(`.component`);

  if (componenStubs.length) {
    let params;
    for (const stub of componenStubs) {
      params = _prepareParams(stub.dataset);
      switch (stub.dataset.name) {
        case `header`:
          _insertComponent(stub, getHeaderElememt(...params));
          break;

        case `answer`:
          _insertComponent(stub, getAnswerElement(`http://placehold.it/468x458`, ...params));
          break;

        case `inGameStats`:
          let inGameStatsElement = stats.getInGameStatsElement(gameData.getPlayerAnswers(), gameData.getGameQuestionsCount());
          _insertComponent(stub, inGameStatsElement);
          break;

        case `scoreDescription`:
          let scoreDescriptionElement = stats.getScoreDescriptionElement(...params);
          _insertComponent(stub, scoreDescriptionElement);
          break;

        case `fullStats`:
          _insertComponent(stub, stats.getFullStatsElement(...params));
          break;
      }
    }
  }
};

const getScreenByName = (screenType) => {
  switch (screenType) {
    case `intro`:
      return getIntroElement();
    case `greeting`:
      return getGreetingElement();
    case `rules`:
      return getRulesElement();
    case `game1`:
      return getGame1Element();
    case `game2`:
      return getGame2Element();
    case `game3`:
      return getGame3Element();
    case `finalStats`:
      let playerStates = [];
      gameData.getResultScore();
      playerStates.push(gameData.getPlayerState());

      // это - мок для проверки отображения статистики, когда win = false;
      playerStates.push({
        win: false,
        remainingLives: 0,
        baseScore: 1000,
        fastAnswers: 3,
        slowAnswers: 3,
        totalScore: 1000
      });

      return stats.getFinalStatsElement(playerStates);
  }
};
export default {
  getElement,
  checkAndAddComponents,
  getScreenByName
};

