import getElement from './elementFactory.js';
import showScreen from './render.js';
import {setHeaderType} from './game-data.js';

const getGame3Element = () => {
  setHeaderType(`info`);
  const game3Template =
    `<div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
  
    <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ -->
    <form class="game__content  game__content--triple">
    
      <!-- ОТВЕТ №1 -->
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      
      <!-- ОТВЕТ №2 -->
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      
      <!-- ОТВЕТ №3 -->
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      
    </form>
    
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>`;

  const game3Element = getElement(game3Template).content;
  const form = game3Element.querySelector(`.game__content`);

  // ОБРАБОТЧИК: клика на одном из ответов (div.game__option)
  form.addEventListener(`click`, () => {
    showScreen(`stats`);
  });

  return game3Element;
};

export default getGame3Element;
