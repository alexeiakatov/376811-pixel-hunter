import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';
// import main from '../main.js';

export default class Game1View extends AbstractView {
  constructor(question1, question2) {
    super();
    this.question1 = JSON.stringify(question1);
    this.question2 = JSON.stringify(question2);
  }

  get template() {
    return `
      <div class="component" data-name="header" data-type="info"></div>
      <div class="game">
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      
        <!-- ФОРМА С 2мя ВОПРОСАМИ И ВАРИАНТАМИ ОТВЕТОВ в ней д.б. 2 варианта ответа -->
        <form class="game__content">
          <div class="component" data-name="answerOption" data-type="1" data-option-number="1" data-question=${question1}></div>    
          <div class="component" data-name="answerOption" data-type="1" data-option-number="2" data-question=${question2}></div>    
        </form>
      
        <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНУТРИ-ИГРОВОЙ СТАТИСТИКИ -->
        <div class="component" data-name="inGameStats"></div>
      </div>
    `;
  }

  render() {
    this.domElement = elementFactory.getElement(this.template);
    if (this.domElement.querySelectorAll(`.component`).length) {
      // elementFactory.checkAndAddComponents(this.domElement);
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
