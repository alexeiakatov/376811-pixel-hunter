import {getHeaderType} from './game-data.js';
import getHeaderElement from './header.js';

import getIntroElement from './intro.js';
import getGreetingElement from './greeting.js';
import getRulesElement from './rules.js';
import getGame1Element from './game-1.js';
import getGame2Element from './game-2.js';
import getGame3Element from './game-3';
import getStatsElement from './stats.js';


const centralElement = document.body.querySelector(`.central`);

const showScreen = (screenType) => {
  let toShow;
  switch (screenType) {
    case `intro`:
      toShow = getIntroElement();
      break;

    case `greeting`:
      toShow = getGreetingElement();
      break;

    case `rules`:
      toShow = getRulesElement();
      break;

    case `game1`:
      toShow = getGame1Element();
      break;

    case `game2`:
      toShow = getGame2Element();
      break;

    case `game3`:
      toShow = getGame3Element();
      break;

    case `stats`:
      toShow = getStatsElement();
      break;
  }

  centralElement.innerHTML = ``;
  let headerType = getHeaderType();
  if (headerType) {
    centralElement.appendChild(getHeaderElement(headerType));
  }
  centralElement.appendChild(toShow);
};


export default showScreen;
