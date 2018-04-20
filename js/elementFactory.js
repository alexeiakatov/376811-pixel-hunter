const getElement = (templateString) => {
  let templateElement = document.createElement(`template`);
  templateElement.innerHTML = templateString;
  return templateElement;
};

export default getElement;
