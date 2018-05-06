import AbstractView from '../AbstractView';
import elementFactory from '../elementFactory.js';

export default class InGameStatsView extends AbstractView {
  // Если передан аргумент { String } historyIndex - это строка содержащая индекс объекта с историей ответов в массивезначит компонет используется для отрисовки итоговой статистики.
  // Если historyIndex не передан - значит компонент должен отрисовывать внутриигровую статистику и сам берет данные из gameData.
  constructor(gameData, historyIndex) {
    super();
    this.playerAnswers = historyIndex ? gameData.getStateFromHistory(historyIndex).answers : gameData.getPlayerAnswers();
    this.allQuestionsCount = gameData.getGameQuestionsCount();
  }

  get _template() {
    let statsString = ``;
    for (let i = 0; i < this.allQuestionsCount; i++) {

      if (this.playerAnswers[i]) {
        statsString += `<li class="stats__result stats__result--${this.playerAnswers[i].isCorrect ? this.playerAnswers[i].speed : `wrong`}"></li>`;
      } else {
        statsString += `<li class="stats__result stats__result--unknown"></li>`;
      }
    }
    return `<ul class="stats">${statsString}</ul>`;
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
