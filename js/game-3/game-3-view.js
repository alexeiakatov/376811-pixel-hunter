import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

export default class Game3View extends AbstractView {
  constructor(gameData, question1Index, question2Index, question3Index) {
    super();
    this.question1Index = question1Index;
    this.question2Index = question2Index;
    this.question3Index = question3Index;
    this.answers = [];
  }

  get _template() {
    return `
      <div class="component" data-name="header" data-type="info"></div>
      <div class="game">
        <p class="game__task">Найдите рисунок среди изображений</p>
      
        <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ - в ней д.б. 3 варианта ответа -->
        <form class="game__content  game__content--triple">
          <div class="component" data-name="questionView" data-game-type="3" data-question-index=${this.question1Index}></div>
          <div class="component" data-name="questionView" data-game-type="3" data-question-index=${this.question2Index}></div>
          <div class="component" data-name="questionView" data-game-type="3" data-question-index=${this.question3Index}></div>
        </form>
        
        <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНУТРИ-ИГРОВОЙ СТАТИСТИКИ -->
        <div class="component" data-name="inGameStatsView"></div>
      </div>
    `;
  }

  _render() {
    this.domElement = elementFactory.getElement(this._template);
    elementFactory.checkAndAddComponents(this.domElement);
  }

  _bind() {
    this.form = this.domElement.querySelector(`.game__content`);

    // ОБРАБОТЧИК: клика на одном из ответов (div.game__option)
    this.form.addEventListener(`click`, (evt) => {
      this.answers.push({
        questionIndex: evt.target.dataset.questionIndex,
        answer: `paint`
      });
      this.onAnswerReady(this.answers);
    });
  }

  onAnswerReady() {}

  get element() {
    if (this.domElement) {
      return this.domElement;
    }

    this._render();
    this._bind();
    return this.domElement;
  }
}
