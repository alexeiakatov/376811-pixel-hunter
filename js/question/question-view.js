import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

const GameType = {
  ONE: `1`,
  TWO: `2`,
  THREE: `3`
};

export default class QuestionView extends AbstractView {
  constructor(gameData, gameType, questionIndex) {
    super();
    let questions = gameData.getQuestions();
    let question = questions[questionIndex];

    this.imageUrl = question.imageUrl || `http://placehold.it/304x455`;
    this.questionIndex = question.index;
    this.gameType = gameType;
  }

  get _templateGameType1or2() {
    return `
      <div class="game__option">
        <img src="${this.imageUrl}" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${this.questionIndex}" type="radio" value="photo" data-question-index=${this.questionIndex}>
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${this.questionIndex}" type="radio" value="paint" data-question-index=${this.questionIndex}>
          <span>Рисунок</span>
        </label>
      </div>
    `;
  }

  get _templateGameType3() {
    return `
      <div class="game__option" data-question-index="${this.questionIndex}">
        <img src="${this.imageUrl}" alt="question_${this.questionIndex}" width="304" height="455">
      </div>
    `;
  }

  get _template() {
    return this.gameType === GameType.ONE || this.gameType === GameType.TWO ? this._templateGameType1or2 : this._templateGameType3;
  }

  _render() {
    this.domElement = elementFactory.getElement(this._template);
    elementFactory.checkAndAddComponents(this.domElement);
  }

  _bind() {}

  get element() {
    if (this.domElement) {
      return this.domElement;
    }

    this._render();
    this._bind();
    let el = document.createElement('template');
    el.innerHTML = this._template;
    return el.content;
    // return this.domElement;
  }
}
