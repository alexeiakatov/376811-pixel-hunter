import elementFactory from './elementFactory.js';

const centralElement = document.body.querySelector(`.central`);

const showScreen = (screenType) => {
  centralElement.innerHTML = ``;
  centralElement.appendChild(elementFactory.getScreenByName(screenType));
};

export default showScreen;
