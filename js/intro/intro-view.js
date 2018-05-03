import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';
import main from '../main.js';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
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
    if (this.asteriskClickHandler) {
      this.domElement.querySelector(`.intro__asterisk`).addEventListener(`click`, this.asteriskClickHandler);
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

