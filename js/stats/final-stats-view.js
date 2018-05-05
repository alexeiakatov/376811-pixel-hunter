import AbstractView from '../AbstractView.js';
import elementFactory from '../elementFactory.js';

export default class FinalStatsView extends AbstractView {

  constructor(gameData) {
    super();
    this.historyPlayerStates = gameData.getStatsHistory();
  }

  get _template() {
    let template = ``;
    let playerState;
    for (let i = 0; i < this.historyPlayerStates.length; i++) {
      template += `
      <div class="component" data-name="fullStatsView" 
                             data-history-state-index=${playerState}
                             data-number="${i + 1}">
      </div>
    `;
    }

    return `
    <div class="component" data-name="header" data-type="empty"></div>
      <div class="result">
      <h1>Победа!</h1>
      ${template}
    </div>
  `;
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
    return this.domElement;
  }
}
