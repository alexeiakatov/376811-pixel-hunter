import elementFactory from './elementFactory.js';
import gameData from './game-data.js';

let GAME_QUESTIONS_COUNT = gameData.getGameQuestionsCount();

// ФУНКЦИЯ: возвращает dom-элемент компонента текущей игровой статистики.
// если передан аргумент playerAnswers - значит компонет используется для отрисовки итоговой статистики и данные передал
// родительский компонент. В ином случае - значит что должен отрисовывать внутриигровую статистику и сам берет данные из gameData.
// { String } playerAnswers
const getInGameStatsElement = (receivedPlayerAnswers) => {
  let playerAnswers = receivedPlayerAnswers ? JSON.parse(receivedPlayerAnswers) : gameData.getPlayerAnswers();

  let statsString = ``;
  for (let i = 0; i < GAME_QUESTIONS_COUNT; i++) {

    if (playerAnswers[i]) {
      statsString += `<li class="stats__result stats__result--${playerAnswers[i].isCorrect ? playerAnswers[i].speed : `wrong`}"></li>`;
    } else {
      statsString += `<li class="stats__result stats__result--unknown"></li>`;
    }
  }
  return elementFactory.getElement(`<ul class="stats">${statsString}</ul>`);
};

// ФУНКЦИЯ: возвращает элемент содержащий пояснение итогового результата.
// { String } playerState
const getScoreDescriptionElement = (playerState) => {
  let playerStateObj = JSON.parse(playerState);

  let templates = [];

  if (playerStateObj.fastAnswers > 0) {
    templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${playerStateObj.fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${playerStateObj.fastAnswers * 50}</td>
      </tr>
    `);
  }

  if (playerStateObj.remainingLives > 0) {
    templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${playerStateObj.remainingLives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${playerStateObj.remainingLives * 50}</td>
      </tr>
    `);
  }
  if (playerStateObj.slowAnswers > 0) {
    templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${playerStateObj.slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${-(playerStateObj.slowAnswers * 50)}</td>
      </tr>
  `);
  }
  if (playerStateObj.slowAnswers > 0 || playerStateObj.fastAnswers > 0 || playerStateObj.remainingLives > 0) {
    templates.push(`
      <tr>
        <td colspan="5" class="result__total  result__total--final">${playerStateObj.totalScore}</td>
      </tr>
      `);
  }
  return elementFactory.getElement(templates.join(``));
};

// ФУНКЦИЯ: возвращает один полный элемент статистики. Т.е. содержащий внутриигровую статистику-картинку по ответам
// и вычисленные результаты и если требуется - пояснения по очкам.
// { String } playerState, number
const getFullStatsElement = (playerState, number) => {
  let playerStateObj = JSON.parse(playerState);

  let answersStr = JSON.stringify(playerStateObj.answers);
  let template;

  if (playerStateObj.win) {
    template = `
     <table class="result__table">
        <tr>
          <td class="result__number">${number}.</td>
          <td colspan="2">
            <div class="component" data-name="inGameStats" data-answers=${answersStr}></div>
          </td>
          <td class="result__points">×&nbsp;100</td>
          <td class="result__total">${playerStateObj.baseScore}</td>
        </tr>
        <tr class="component" data-name="scoreDescription" data-player-state=${playerState}>
        </tr>
      </table>
  `;
  } else {
    template = `
      <table class="result__table">
         <tr>
           <td class="result__number">${number}.</td>
           <td>
              <div class="component" data-name="inGameStats" data-answers=${answersStr}></div>
           </td>
           <td class="result__total"></td>
           <td class="result__total  result__total--final">fail</td>
         </tr>
       </table>
    `;
  }

  let fullStatsElement = elementFactory.getElement(template);
  elementFactory.checkAndAddComponents(fullStatsElement);
  return fullStatsElement;
};


// ФУНКЦИЯ: возвращает dom-элемент экрана итоговой статистики.
// { Array } playerStates
// { Object } playerStates[i]
const getFinalStatsElement = (playerStates) => {
  let template = ``;
  let playerState;
  for (let i = 0; i < playerStates.length; i++) {
    playerState = JSON.stringify(playerStates[i]);

    template += `
      <div class="component" data-name="fullStats" 
                             data-player-state=${playerState}
                             data-number="${i + 1}">
      </div>
    `;
  }

  let statsTemplate = `
    <div class="component" data-name="header" data-type="empty"></div>
      <div class="result">
      <h1>Победа!</h1>
      ${template}
    </div>
  `;

  let finalStatsElement = elementFactory.getElement(statsTemplate);
  elementFactory.checkAndAddComponents(finalStatsElement);

  gameData.clearPlayerState();

  return finalStatsElement;
};

export default {
  getInGameStatsElement,
  getFinalStatsElement,
  getScoreDescriptionElement,
  getFullStatsElement
};
