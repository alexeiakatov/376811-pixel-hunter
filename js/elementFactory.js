import HeaderView from './header/header-view.js';
import QuestionView from './question/question-view.js';
import stats from './stats.js';
import gameData from './game-data.js';
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

export default {
  getElement,
  checkAndAddComponents,
};

