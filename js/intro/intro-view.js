import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

export default class IntroView extends AbstractView {
  constructor(gameData) {
    super();
    this.gameData = gameData;
  }

  get _template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
    `;
  }

  _render() {
    this.domElement = elementFactory.getElement(this._template);
    elementFactory.checkAndAddComponents(this.domElement);
  }

  _bind() {
    if (this.asteriskClickHandler) {
      this.domElement.querySelector(`.intro__asterisk`).addEventListener(`click`, this.asteriskClickHandler);
    }
  }

  get element() {
    if (this.domElement) {
      return this.domElement;
    }

    this._render();
    this._bind();
    return this.domElement;
  }
}

