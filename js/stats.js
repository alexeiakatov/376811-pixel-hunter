import elementFactory from './elementFactory.js';

// ФУНКЦИЯ: возвращает dom-элемент компонента текущей игровой статистики.
const getInGameStatsElement = (playerAnswers, questionsCount) => {
  let statsString = ``;
  for (let i = 0; i < questionsCount; i++) {
    if (playerAnswers[i]) {
      statsString += `<li class="stats__result stats__result--${playerAnswers[i].isCorrect ? playerAnswers[i].speed : `wrong`}"></li>`;
    } else {
      statsString += `<li class="stats__result stats__result--unknown"></li>`;
    }
  }
  return elementFactory.getElement(`<ul class="stats">${statsString}</ul>`);
};

// ФУНКЦИЯ: возвращает элемент с пояснением итогового результата.
const getScoreDescriptionElement = (totalScore, fastAnswers, slowAnswers, remainingLives) => {
  let templates = [];
  fastAnswers = parseInt(fastAnswers, 10);
  slowAnswers = parseInt(slowAnswers, 10);
  remainingLives = parseInt(remainingLives, 10);

  if (fastAnswers > 0) {
    templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswers}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${fastAnswers * 50}</td>
      </tr>
    `);
  }
  if (remainingLives > 0) {
    templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${remainingLives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${remainingLives * 50}</td>
      </tr>
    `);
  }
  if (slowAnswers > 0) {
    templates.push(`
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswers}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${-(slowAnswers * 50)}</td>
      </tr>
  `);
  }
  if (slowAnswers > 0 || fastAnswers > 0 || remainingLives > 0) {
    templates.push(`
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalScore}</td>
      </tr>
      `);
  }
  return elementFactory.getElement(templates.join(``));
};

// ФУНКЦИЯ: возвращает один полный элемент статистики. Т.е. содержащий статистику-картинку по ответам
// и вычисленные результаты и если требуется - пояснения по очкам.
const getFullStatsElement = (totalScore, baseScore, fastAnswers, slowAnswers, remainingLives, win, number) => {
  let template;
  if (win === `true`) {
    template = `
   <table class="result__table">
      <tr>
        <td class="result__number">${number}.</td>
        <td colspan="2">
          <div class="component" data-name="inGameStats"></div>
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${baseScore}</td>
      </tr>
      <tr class="component" data-name="scoreDescription" data-total-score="${totalScore}" 
                                                         data-fast-answers="${fastAnswers}"
                                                         data-slow-answers="${slowAnswers}"
                                                         data-remaining-lives="${remainingLives}"
                                                         >
      </tr>
    </table>
  `;
  } else {
    template = `
      <table class="result__table">
         <tr>
           <td class="result__number">${number}.</td>
           <td>
              <div class="component" data-name="inGameStats"></div>
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
const getFinalStatsElement = (playerStates) => {
  let toInsertStatsString = ``;
  let playerState;
  for (let i = 0; i < playerStates.length; i++) {
    playerState = playerStates[i];

    toInsertStatsString += `
      <div class="component" data-name="fullStats" 
                             data-total-score="${playerState.totalScore}"
                             data-base-score="${playerState.baseScore}"
                             data-fast-answers="${playerState.fastAnswers}"
                             data-slow-answers="${playerState.slowAnswers}"
                             data-remaining-lives="${playerState.remainingLives}"
                             data-win="${playerState.win}"
                             data-number="${i + 1}">
      </div>
    `;
  }

  let statsTemplate = `
    <div class="component" data-name="header" data-type="empty"></div>
      <div class="result">
      <h1>Победа!</h1>
      ${toInsertStatsString}
    </div>
  `;

  let finalStatsElement = elementFactory.getElement(statsTemplate);
  elementFactory.checkAndAddComponents(finalStatsElement);

  return finalStatsElement;
};

export default {
  getInGameStatsElement,
  getFinalStatsElement,
  getScoreDescriptionElement,
  getFullStatsElement
};
