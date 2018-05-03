import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';
import main from '../main.js';

export default class HeaderView extends AbstractView {

  constructor(allLives, remainingLives, type) {
    super();
    if (type === `info`) {
      this.allLives = allLives;
      this.remainingLives = remainingLives;
      this.type = `info`;
    } else {
      this.type = `empty`;
    }
  }

  // возвращает шаблон хедера БЕЗ игровой информации
  get _templateEmpty() {
    return `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
      </header>
    `;
  }

  // возвращает шаблон хедера С игровой информацией
  get _templateInfo() {
    let livesElementStrings = [];
    for (let i = 0; i < this.allLives; i++) {
      if (i < this.remainingLives) {
        livesElementStrings.push(`
          <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
        `);
      } else {
        livesElementStrings.push(`
          <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
        `);
      }
    }
    let livesElementTemplate = livesElementStrings.reverse().join(``);

    return `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
        <h1 class="game__timer">NN</h1>
        <div class="game__lives">
          ${livesElementTemplate}
        </div>
      </header>
    `;
  }

  get template() {
    return this.type === `info` ? this._templateInfo : this._templateEmpty;
  }

  render() {
    this.domElement = elementFactory.getElement(this.template);
  }

  bind() {
    if (this.backButtonClickHandler) {
      this.domElement.querySelector(`.header .back`).addEventListener(`click`, this.backButtonClickHandler);
    }
  }

  get element() {
    if (this.domElement) {
      return this.domElement;
    }

    this.render();
    this.bind();
    return this.domElement;
  }
}
