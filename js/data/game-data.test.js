import {assert} from 'chai';
import gameData from './game-data.js';

// let getResultScore = gameData.getResultScore;
let getTimer = gameData.getTimer;

// describe(`Array`, () => {
//   describe(`#indexOf()`, () => {
//     it(`should return -1 when the value is not present`, () => {
//       assert.equal(-1, [1, 2, 3].indexOf(4));
//     });
//   });
// });

describe(`*** TEST getResultScore() in game-data.js ***`, () => {

  // it(`Должна возвращать -1, если в playerState поле win равно false, null или undefined.`, () => {
  //   for (let i = 0; i < 10; i++) {
  //     let playerAnswers = new Array(i);
  //     assert.equal(getResultScore(playerAnswers), -1);
  //   }
  // });
  //
  // // Если все ответы правильные, но медленные.
  // it(`Должна вернуть 650, если все ответы верные (т.е. все 3 жизни сохранены), но медленные.`, () => {
  //   let playerAnswers = new Array(10);
  //   playerAnswers.fill({isCorrect: true, speed: `slow`, time: 21000});
  //   assert.equal(getResultScore(playerAnswers, 3), 650);
  // });
  //
  // // Если все ответы правильные и быстрые.
  // it(`Должна вернуть 1650, если все ответы верные и быстрые.`, () => {
  //   let playerAnswers = new Array(10);
  //   playerAnswers.fill({isCorrect: true, time: 9999});
  //   assert.equal(getResultScore(playerAnswers, 3), 1650);
  // });
  //
  // // Если все ответы правильные и нормальные по скорости.
  // it(`Должна вернуть 1150, если все ответы верные и нормальные по скорости.`, () => {
  //   let playerAnswers = new Array(10);
  //   playerAnswers.fill({isCorrect: true, time: 15000});
  //   assert.equal(getResultScore(playerAnswers, 3), 1150);
  // });
  //
  // // Все ответы быстрые и допущена 1 ошибка.
  // it(`Должна вернуть 1450 если все ответы быстрые, и есть одна ошибка в любом одном ответе.`, () => {
  //   let playerAnswers = new Array(10);
  //   for (let i = 0; i < playerAnswers.length; i++) {
  //     let obj = {isCorrect: true, time: 9999};
  //     playerAnswers[i] = obj;
  //   }
  //
  //   for (let i = 0; i < playerAnswers.length; i++) {
  //     playerAnswers[i].isCorrect = false;
  //     assert.equal(getResultScore(playerAnswers, 2), 1450);
  //     playerAnswers[i].isCorrect = true;
  //   }
  // });
  //
  // //
  // it(`Должна вернуть 1250 если все ответы быстрые, и есть 2 ошибки.`, () => {
  //   let playerAnswers = new Array(10);
  //   for (let i = 0; i < playerAnswers.length; i++) {
  //     let obj = {isCorrect: true, time: 9999};
  //     playerAnswers[i] = obj;
  //   }
  //
  //   playerAnswers[0].isCorrect = false;
  //   playerAnswers[5].isCorrect = false;
  //   assert.equal(getResultScore(playerAnswers, 1), 1250);
  // });
  //
  // it(`Должна вернуть 1050, если все ответы быстрые и есть 3 ошибки .`, () => {
  //   let playerAnswers = new Array(10);
  //   for (let i = 0; i < playerAnswers.length; i++) {
  //     let obj = {isCorrect: true, time: 9999};
  //     playerAnswers[i] = obj;
  //   }
  //
  //   playerAnswers[0].isCorrect = false;
  //   playerAnswers[5].isCorrect = false;
  //   playerAnswers[9].isCorrect = false;
  //   assert.equal(getResultScore(playerAnswers, 0), 1050);
  // });


});

describe(`*** TEST getTimer() in game-data.js ***`, () => {

  it(`При вызове должен возвращать полноценный объект таймера.`, () => {
    const time = 30;
    const timerObj = getTimer(time);

    assert.isObject(timerObj, `Должна возвращать объект.`);

    assert.property(timerObj, `timeLeft`, `Должен содержать поле timeLeft`);
    assert.equal(timerObj.timeLeft, time, `Начальное время д.б. равно переданному в функцию.`);

    assert.property(timerObj, `intervalId`, `Должен содержать поле intervalId`);
    assert.isNull(timerObj.intervalId, `В исходном состоянии intervalId д.б. null.`);

    assert.property(timerObj, `start`, `Должен содержать поле start`);
    assert.isFunction(timerObj.start, `На поле start д.б. метод start()`);

    assert.property(timerObj, `tick`, `Должен содержать поле tick`);
    assert.isFunction(timerObj.tick, `На поле tick д.б. метод tick()`);

    assert.property(timerObj, `stop`, `Должен содержать поле stop`);
    assert.isFunction(timerObj.stop, `На поле stop д.б. метод stop()`);

    assert.property(timerObj, `getTime`, `Должен содержать поле getTime`);
    assert.isFunction(timerObj.getTime, `На поле getTime д.б. метод getTime()`);
  });

});

