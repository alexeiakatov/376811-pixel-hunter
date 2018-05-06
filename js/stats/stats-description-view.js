import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

export default class StatsDescriptionView extends AbstractView {
  constructor(gameData, historyIndex) {
    super();
    this.historyState = gameData.getStateFromHistory(historyIndex);
  }

  get _template() {
    let templates = [];

    if (this.historyState.fastAnswers > 0) {
      templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${this.historyState.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.historyState.fastAnswersBonus}</td>
      </tr>
    `);
    }

    if (this.historyState.remainingLives > 0) {
      templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${this.historyState.remainingLives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.historyState.savedLivesBonus}</td>
      </tr>
    `);
    }
    if (this.historyState.slowAnswers > 0) {
      templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${this.historyState.slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${this.historyState.slowAnswersPennalty}</td>
      </tr>
  `);
    }
    if (this.historyState.slowAnswers > 0 || this.historyState.fastAnswers > 0 || this.historyState.remainingLives > 0) {
      templates.push(`
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this.historyState.totalScore}</td>
      </tr>
      `);
    }

    return templates.join(``);
  }

  _bind() {}

  _render() {
    let template = document.createElement(`template`);
    template.innerHTML = this._template;
    this.domElement = template.content;
    elementFactory.checkAndAddComponents(this.domElement);
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
