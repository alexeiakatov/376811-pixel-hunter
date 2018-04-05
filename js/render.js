const centralElement = document.body.querySelector(`.central`);

const showScreen = (screenElement) => {
  centralElement.innerHTML = ``;
  centralElement.appendChild(screenElement);
};


export default showScreen;
