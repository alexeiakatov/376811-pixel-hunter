import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';
// import main from '../main.js';

export default class GreetingView extends AbstractView {

  constructor(gameData) {
    super();
    this.gameData = gameData;
  }

  get template() {
    return `
      <div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
            Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
            Задача кажется тривиальной, но не думай, что все так просто.<br>
            Фотореализм обманчив и коварен.<br>
            Помни, главное — смотреть очень внимательно.</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
    `;
  }

  render() {
    this.domElement = elementFactory.getElement(this.template);
    if (this.domElement.querySelectorAll(`.component`).length) {
      elementFactory.checkAndAddComponents(this.domElement);
    }
  }

  bind() {
    if (this.continueButtonClickHandler) {
      this.domElement.querySelector(`.greeting__continue`).addEventListener(`click`, this.continueButtonClickHandler);
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
