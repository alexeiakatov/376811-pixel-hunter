import getElement from './elementFactory.js';
import showScreen from './render.js';
import {setHeaderType} from './game-data.js';
import getAnswerElement from "./answers";


const getGame2Element = () => {
  setHeaderType(`info`);

  const game2Template =
    `<div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
  
    <!-- ФОРМА С ВАРИАНТАМИ ОТВЕТОВ -->
    <form class="game__content  game__content--wide">
    
      
      
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

  const game2Element = getElement(game2Template).content;
  const form = game2Element.querySelector(`.game__content`);
  form.appendChild(getAnswerElement(2, `http://placehold.it/705x455`));

  // ОБРАБОТЧИК: события 'change' на форме с вопросами.
  form.addEventListener(`change`, () => {
    showScreen(`game3`);
  });

  return game2Element;
};

export default getGame2Element;


