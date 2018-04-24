import getHeaderElememt from './header.js';
import getAnswerOptionElement from './answerOption.js';
import gameData from './game-data.js';
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
  if (componentElement) {
    stub.parentNode.replaceChild(componentElement, stub);
  }
};

const checkAndAddComponents = (element) => {
  // найти все втраиваемые компоненты в элементе
  const componenStubs = element.querySelectorAll(`.component`);

  if (componenStubs.length) {
    let params;
    // выполнить для каждого встраиваемого компонента
    for (const stub of componenStubs) {
      // создать js-объект с аргументами из data-атрибутов встраиваемого компонента
      params = _prepareParams(stub.dataset);

      switch (stub.dataset.name) {
        case `header`:
          _insertComponent(stub, getHeaderElememt(...params));
          break;

        case `answerOption`:
          _insertComponent(stub, getAnswerOptionElement(...params));
          break;

        case `inGameStats`:
          let inGameStatsElement = stats.getInGameStatsElement(...params);
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
    // case `finalStats`:
    //   let playerStates = [];
    //   gameData.getResultScore();
    //   playerStates.push(gameData.getPlayerState());
    //
    //   // это - мок для проверки отображения статистики, когда win = false;
    //   playerStates.push({
    //     win: false,
    //     remainingLives: 0,
    //     baseScore: 1000,
    //     fastAnswers: 3,
    //     slowAnswers: 3,
    //     totalScore: 1000
    //   });
    //
    //   return stats.getFinalStatsElement(playerStates);
  }
};
export default {
  getElement,
  checkAndAddComponents,
  getScreenByName
};

