import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

export default class Game2View extends AbstractView {
  constructor(gameData, questionIndex) {
    super();
    this.questionIndex = questionIndex;
    this.answers = [];
  }

  get _template() {
    return `
      <div class="component" data-name="header" data-type="info"></div>
      
      <div class="game">
        <p class="game__task">Угадай, фото или рисунок?</p>
  
        <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ - в ней д.б. 1 вариант ответа -->
        <form class="game__content  game__content--wide">
          <div class="component" data-name="questionView" data-game-type="2" data-question-index=${this.questionIndex}></div>    
        </form>
    
        <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНЕТРИИГРОВОЙ СТАТИСТИКИ - элементы д.б. получены из модуля inGameStats.js -->
        <div class="component" data-name="inGameStatsView"></div>
      </div>
    `;
  }

  _render() {
    this.domElement = elementFactory.getElement(this._template);
    elementFactory.checkAndAddComponents(this.domElement);
  }

  _bind() {
    const form = this.domElement.querySelector(`.game__content`);

    // ОБРАБОТЧИК: события 'change' на форме с вопросом.
    form.addEventListener(`change`, (evt) => {
      this.answers.push({
        questionIndex: evt.target.dataset.questionIndex,
        answer: evt.target.value
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
