import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

export default class FullStatsView extends AbstractView {

  constructor(gameData, historyIndex, number) {
    super();
    this.historyIndex = historyIndex;
    this.number = number;

    let stateInHistory = gameData.getStateFromHistory(historyIndex);
    this.baseScore = stateInHistory.baseScore;
    this.win = stateInHistory.win;
  }

  get _templateWin() {
    return `
      <table class="result__table">
        <tr>
          <td class="result__number">${this.number}.</td>
          <td colspan="2">
            <div class="component" data-name="inGameStatsView" data-answers=${this.historyIndex}></div>
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${this.baseScore}</td>
        </tr>
        <tr class="component" data-name="statsDescriptionView" data-player-state=${this.historyIndex}>
        </tr>
      </table>
    `;
  }

  get _templateFail() {
    return `
      <table class="result__table">
         <tr>
           <td class="result__number">${this.number}.</td>
           <td>
              <div class="component" data-name="inGameStatsView" data-answers=${this.historyIndex}></div>
           </td>
           <td class="result__total"></td>
           <td class="result__total  result__total--final">fail</td>
         </tr>
      </table> 
    `;
  }

  get _template() {
    return this.win ? this._templateWin : this._templateFail;
  }

  _bind() {}

  _render() {
    this.domElement = elementFactory.getElement(this._template);
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
