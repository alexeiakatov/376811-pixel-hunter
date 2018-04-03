const getElement = (templateString) => {
  let element = document.createElement(`div`);
  element.innerHTML = templateString;
  return element;
};

export default getElement;
