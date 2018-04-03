const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ALT = 18;

let altPressed = false;
let currentScreenNumber = 1;

const gameScreens = [];
const centralElement = document.body.querySelector(`.central`);

const greetingTemplateElement = document.getElementById(`greeting`);
const rulesTemplateElement = document.getElementById(`rules`);
const game1TemplateElement = document.getElementById(`game-1`);
const game2TemplateElement = document.getElementById(`game-2`);
const game3TemplateElement = document.getElementById(`game-3`);
const statsTemplateElement = document.getElementById(`stats`);

const mainTemplateElement = document.createElement(`template`);
mainTemplateElement.id = `main`;
let element;
for (let i = 0; i < centralElement.children.length; i++) {
  element = centralElement.children[i].cloneNode(true);
  mainTemplateElement.content.appendChild(element);
}

gameScreens.push(mainTemplateElement);
gameScreens.push(greetingTemplateElement);
gameScreens.push(rulesTemplateElement);
gameScreens.push(game1TemplateElement);
gameScreens.push(game2TemplateElement);
gameScreens.push(game3TemplateElement);
gameScreens.push(statsTemplateElement);

let showScreen = function (screenNumber) {
  if (screenNumber < gameScreens.length && screenNumber > -1) {
    centralElement.innerHTML = ``;
    centralElement.appendChild(gameScreens[screenNumber].content.cloneNode(true));
  }
};

let switchScreen = function (keyCode) {
  if (keyCode === RIGHT_ARROW && currentScreenNumber < gameScreens.length - 1) {
    showScreen(++currentScreenNumber);
  } else if (keyCode === LEFT_ARROW && currentScreenNumber > 0) {
    showScreen(--currentScreenNumber);
  }
};

document.addEventListener(`keydown`, function (evt) {
  if (evt.keyCode === ALT) {
    evt.preventDefault();
    altPressed = true;
  }

  if (altPressed && (evt.keyCode === LEFT_ARROW || evt.keyCode === RIGHT_ARROW)) {
    evt.preventDefault();
    switchScreen(evt.keyCode);
  }

});

document.addEventListener(`keyup`, function (evt) {
  if (evt.keyCode === ALT) {
    altPressed = false;
  }
});

showScreen(currentScreenNumber);
