import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

export default class Game1View extends AbstractView {
  constructor(gameData, question1index, question2index) {
    super();
    this.question1index = question1index;
    this.question2index = question2index;
    this.answers = [];
  }

  get _template() {
    return `
      <div class="component" data-name="header" data-type="info"></div>
      <div class="game">
        <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      
        <!-- ФОРМА С 2мя ВОПРОСАМИ И ВАРИАНТАМИ ОТВЕТОВ в ней д.б. 2 варианта ответа -->
        <form class="game__content">
          <div class="component" data-name="questionView" data-game-type="1" data-question-index=${this.question1index}></div>    
          <div class="component" data-name="questionView" data-game-type="1" data-question-index=${this.question2index}></div>    
        </form>
      
        <!-- КОНТЕЙНЕР ДЛЯ ЭЛЕМЕНТОВ ВНУТРИ-ИГРОВОЙ СТАТИСТИКИ -->
        <div class="component" data-name="inGameStats"></div>
      </div>
    `;
  }

  _render() {
    this.domElement = elementFactory.getElement(this._template);
    elementFactory.checkAndAddComponents(this.domElement);
  }

  _bind() {
    this.form = this.domElement.querySelector(`.game__content`);
    this.questionInputElements = this.form.querySelectorAll(`input`);

    // ОБРАБОТЧИК: события 'change' на форме. Для обработки кликов-ответов на вопросы question1 и question2.
    this.form.addEventListener(`change`, (evt) => {
      console.log('zzzzzz');
      for (const inputElement of this.questionInputElements) {
        if (inputElement.name === evt.target.name) {
          inputElement.disabled = true;
        }
      }

      this.answers.push({
        questionIndex: evt.target.dataset.questionIndex,
        answer: evt.target.value
      });

      if (this.answers.length === 2 && this.onAnswersReady) {
        this.onAnswersReady();
      }
    });
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
