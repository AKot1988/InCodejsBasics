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
    return {
      path: `dice-${dise}.png`,
      number: dise,
    };
  }
};
let restartGame = () => {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
};
let cnhangeActivePlayerStyles = () => {
  document
    .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
    .classList.toggle('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');
};
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];

//get DOM elements

let diceImageElement = document.querySelector('.dice');
let rollButton = document.querySelector('.btn--roll');
let holdButton = document.querySelector('.btn--hold');
let newGameButton = document.querySelector('.btn--new');

restartGame();
diceImageElement.src = generateDisePositionImgPath(2, 6).path;

rollButton.addEventListener('click', () => {
  let { path, number } = generateDisePositionImgPath(1, 6);
  diceImageElement.src = path;
  if (number === 1) {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    activePlayer = activePlayer === 0 ? 1 : 0;
    cnhangeActivePlayerStyles();
  } else {
    currentScore += number;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
});
holdButton.addEventListener('click', () => {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 10) {
    alert(`Player ${activePlayer + 1} has won the game!`);
    restartGame();
  } else {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = '0';
    activePlayer = activePlayer === 0 ? 1 : 0;
    cnhangeActivePlayerStyles();
  }
});
newGameButton.addEventListener('click', () => {
  restartGame();
});

function age(birthYear) {
  let currDate = new Date().getFullYear();
  return `${nameFull} is ${currDate - birthYear} years old.`;
}

const nameFull = 'John Doe';
console.log(age(1988));
var firstName = 'Jane';
// let firstName = 'Jane';

console.log(window);
console.dir(rollButton);

const kysia = {
  name: 'Kysia',
  year: 2010,
  calcAge: function () {
    console.log(this);
    console.log(2024 - this.year);
  },
};

kysia.calcAge();
const f = {};
f.calcAge = kysia.calcAge;
f.year = 2015;
f.calcAge();
