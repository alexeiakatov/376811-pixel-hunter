const getRandomValue = function (min, max, scale) {

  if (typeof scale !== `number` || scale < 0 || typeof min !== `number` || typeof max !== `number`) {
    return null;
  }
  let result = min + Math.random() * (max - min);
  scale = Math.abs(scale);
  scale = parseInt(scale + ``, 10);

  return Number(result.toFixed(scale));
};

export default {
  getRandomValue
};
