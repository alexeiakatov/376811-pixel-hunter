import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';
// import main from '../main.js';

export default class RulesView extends AbstractView {

  constructor(gameData) {
    super();
    this.gameData = gameData;
  }

  get template() {
    return `
      <div class="component" data-name="header" data-type="empty"></div>
    
      <div class="rules">
        <h1 class="rules__title">Правила</h1>
        <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
          src="img/photo_icon.png" width="16" height="16"> или рисунок <img
          src="img/paint_icon.png" width="16" height="16" alt="">.<br>
          Фотографиями или рисунками могут быть оба изображения.<br>
          На каждую попытку отводится 30 секунд.<br>
          Ошибиться можно не более 3 раз.<br>
          <br>
          Готовы?
        </p>
        <form class="rules__form">
          <input class="rules__input" type="text" placeholder="Ваше Имя">
          <button class="rules__button  continue" type="submit" disabled>Go!</button>
        </form>
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
    this.goButtonElement = this.domElement.querySelector(`.rules__button`);
    this.goButtonElement.disabled = true;

    if (this.goButtonClickHandler) {
      console.log('go btn attached');
      this.goButtonElement.addEventListener(`click`, this.goButtonClickHandler);
    } else console.log('not attached');

    this.domElement.querySelector(`.rules__input`).addEventListener(`input`, (evt) => {
      this.goButtonElement.disabled = (evt.target.value && evt.target.value.length > 0) ? false : true;
    });
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
