const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const ALT = 18;

let altPressed = false;
let currentScreenNumber = 1;

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

const gameScreens = [
  mainTemplateElement,
  greetingTemplateElement,
  rulesTemplateElement,
  game1TemplateElement,
  game2TemplateElement,
  game3TemplateElement,
  statsTemplateElement
];

const showScreen = (screenNumber) => {
  if (screenNumber < gameScreens.length && screenNumber > -1) {
    centralElement.innerHTML = ``;
    centralElement.appendChild(gameScreens[screenNumber].content.cloneNode(true));
  }
};

const switchScreen = (evt) => {
  evt.preventDefault();
  if (evt.keyCode === ALT) {
    altPressed = true;
  }
  // to RIGHT
  if (altPressed && evt.keyCode === RIGHT_ARROW && currentScreenNumber < gameScreens.length - 1) {
    showScreen(++currentScreenNumber);
  }
  //  to LEFT
  if (altPressed && evt.keyCode === LEFT_ARROW && currentScreenNumber > 0) {
    showScreen(--currentScreenNumber);
  }
};

document.addEventListener(`keydown`, switchScreen);

document.addEventListener(`keyup`, function (evt) {
  if (evt.keyCode === ALT) {
    altPressed = false;
  }
});

showScreen(currentScreenNumber);
