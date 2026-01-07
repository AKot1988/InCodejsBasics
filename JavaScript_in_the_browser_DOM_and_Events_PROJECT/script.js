'use strict';

// ----------поверне будь яке число з діапазону між заданими
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----------міняє мекткс месседжу у просимспному ДОМ елементі
function displayedMessage(message, element) {
  element.textContent = `${message}`;
}

// varriables to owerride
let startNumberInterval = 1;
let finishNumberInterval = 20;
// let secretNumber = randomInt(startNumberInterval, finishNumberInterval);
let score = finishNumberInterval;
let highScore = 0;
let randomNumber = randomInt(startNumberInterval, finishNumberInterval); //number
console.log(randomNumber);

const messageOption = {
  initial: 'Start guessing...',
  low: '📉 Too low!',
  high: '📈 Too high!',
  correct: '🎉 Correct Number!',
  noNumber: '⛔️ No number!',
  lose: 'you lose',
};

// get DOM elements to interaction
const body = document.querySelector('body');
const messageElement = document.querySelector('.message');
const againButton = document.querySelector('.again');
const checkButton = document.querySelector('.check');
const scoreIndication = document.querySelector('.score');
const hiScoreIndication = document.querySelector('.highscore');
const inputNumber = document.querySelector('.guess');
const number = document.querySelector('.number');

checkButton.addEventListener('click', () => {
  let numberSugestion = Number(inputNumber.value);
  if (!numberSugestion) {
    displayedMessage(messageOption.noNumber, messageElement);
  } else if (score <= 1) {
    displayedMessage(messageOption.lose, messageElement);
    checkButton.disabled = true;
    checkButton.style.color = 'transparent';
  } else if (score > 0) {
    if (numberSugestion < randomNumber) {
      score--;
      displayedMessage(messageOption.low, messageElement);
      displayedMessage(score, scoreIndication);
    } else if (numberSugestion > randomNumber) {
      score--;
      displayedMessage(messageOption.high, messageElement);
      displayedMessage(score, scoreIndication);
    } else if (numberSugestion === randomNumber) {
      displayedMessage(randomNumber, number);
      displayedMessage(messageOption.correct, messageElement);
      highScore < score
        ? ((highScore = score), displayedMessage(highScore, hiScoreIndication))
        : null;
      //next we have oport. to push one more class name to elem, or extract one. But...
      body.style.backgroundColor = 'teal';
      checkButton.disabled = true;
      checkButton.style.color = 'transparent';
    }
  }
});

againButton.addEventListener('click', () => {
  score = finishNumberInterval;
  randomNumber = randomInt(startNumberInterval, finishNumberInterval);
  displayedMessage('?', number);
  displayedMessage(messageOption.initial, messageElement);
  displayedMessage(score, scoreIndication);
  body.style.backgroundColor = '#222';
  checkButton.disabled = false;
  checkButton.style.color = '#222';
  inputNumber.value = '';
});
