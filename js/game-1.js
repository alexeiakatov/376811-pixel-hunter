import getElement from './elementFactory.js';
import showScreen from './render.js';
import getAnswerElement from './answers.js';
import {setHeaderType} from './game-data.js';

const getGame1Element = () => {
  setHeaderType(`info`);
  const game1Template =
    `<div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    
    <!-- ФОРМА С ВОПРОСАМИ И ВАРИАНТАМИ ОТВЕТОВ -->
    <form class="game__content">
    
      <!--<div class="game__option">-->
        <!--<img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">-->
        <!---->
        <!--&lt;!&ndash; ПЕРВЫЙ ВОПРОС - ОТВЕТ №1 &ndash;&gt;-->
        <!--<label class="game__answer game__answer&#45;&#45;photo">-->
          <!--<input name="question1" type="radio" value="photo">-->
          <!--<span>Фото</span>-->
        <!--</label>-->
        <!---->
        <!--&lt;!&ndash; ПЕРВЫЙ ВОПРОС - ОТВЕТ №2 &ndash;&gt;-->
        <!--<label class="game__answer game__answer&#45;&#45;paint">-->
          <!--<input name="question1" type="radio" value="paint">-->
          <!--<span>Рисунок</span>-->
        <!--</label>-->
      <!--</div>-->
      
      <!--<div class="game__option">-->
        <!--<img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">-->
        <!---->
        <!--&lt;!&ndash; ВТОРОЙ ВОПРОС - ОТВЕТ №1 &ndash;&gt;-->
        <!--<label class="game__answer  game__answer&#45;&#45;photo">-->
          <!--<input name="question2" type="radio" value="photo">-->
          <!--<span>Фото</span>-->
        <!--</label>-->
        <!---->
        <!--&lt;!&ndash; ВТОРОЙ ВОПРОС - ОТВЕТ №2&ndash;&gt;-->
        <!--<label class="game__answer  game__answer&#45;&#45;paint">-->
          <!--<input name="question2" type="radio" value="paint">-->
          <!--<span>Рисунок</span>-->
        <!--</label>-->
      <!--</div>-->
      
    </form>
    
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>`;

  const game1Element = getElement(game1Template).content;
  const form = game1Element.querySelector(`.game__content`);


  form.appendChild(getAnswerElement(1, `http://placehold.it/468x458`, 1));
  form.appendChild(getAnswerElement(1, `http://placehold.it/468x458`, 2));

  const questionInputElements = form.querySelectorAll(`input`);
  let checkedCount;

  // ОБРАБОТЧИК: события 'change' на форме. Для обработки кликов-ответов на вопросы question1 и question2.
  form.addEventListener(`change`, (evt) => {
    checkedCount = 0;
    questionInputElements.forEach((element) => {
      if (element.name === evt.target.name) {
        element.disabled = true;
      }
      if (element.checked) {
        ++checkedCount;
      }
    });

    if (checkedCount === 2) {
      showScreen(`game2`);
    }
  });

  return game1Element;
};

export default getGame1Element;

