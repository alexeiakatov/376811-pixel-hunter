import HeaderView from './header/header-view.js';
import QuestionView from './question/question-view.js';

import InGameStatsView from './stats/in-game-stats-view.js';
import FullStatsView from './stats/full-stats-view.js';
import StatsDescriptionView from './stats/stats-description-view.js';

import gameData from './data/game-data.js';
import main from './main.js';


const getElement = (templateString) => {
  let element = document.createElement(`div`);
  element.innerHTML = templateString;
  return element;
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
      // создать js-объект с аргументами из data-атрибутов тега, которым был определен встраиваемый компонент
      params = _prepareParams(stub.dataset);

      switch (stub.dataset.name) {
        case `header`:
          const headerView = new HeaderView(gameData, ...params);
          headerView.backButtonClickHandler = () => {
            main.goGreetingOrRules(`greeting`);
          };
          _insertComponent(stub, headerView.element);
          break;

        case `questionView`:
          _insertComponent(stub, new QuestionView(gameData, ...params).element);
          break;

        case `inGameStatsView`:
          let inGameStatsView = new InGameStatsView(gameData, ...params);
          _insertComponent(stub, inGameStatsView.element);
          break;

        case `statsDescriptionView`:
          let statsDescriptionView = new StatsDescriptionView(gameData, ...params);
          _insertComponent(stub, statsDescriptionView.element);
          break;

        case `fullStatsView`:
          let fullStatsView = new FullStatsView(gameData, ...params);
          _insertComponent(stub, fullStatsView.element);
          break;
      }
    }
  }
};

export default {
  getElement,
  checkAndAddComponents,
};

