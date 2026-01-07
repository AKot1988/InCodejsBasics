'use strict';
let randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let generateDisePositionImgPath = (startNumber, endNumber) => {
  if (
    startNumber < 0 ||
    startNumber > 6 ||
    endNumber < 0 ||
    endNumber > 6 ||
    startNumber > endNumber
  ) {
    throw new Error(
      'NumbersShould be inside 0-6 range and startNumber should be less than endNumber'
    );
  } else {
    let dise = randomNumber(startNumber, endNumber);
    return `dice-${dise}.png`;
  }
};
// let randomDiceNumber = generateDisePosition(1, 6);

//get DOM elements
let diceImageElement = document.querySelector('.dice');
let rollButton = document.querySelector('.btn--roll');

diceImageElement.src = generateDisePositionImgPath(2, 6);

rollButton.addEventListener('click', () => {
  diceImageElement.src = generateDisePositionImgPath(1, 6);
});
