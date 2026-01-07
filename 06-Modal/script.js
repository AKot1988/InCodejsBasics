'use strict';
let showModalButtons = document.querySelectorAll('.show-modal');
let modal = document.querySelector('.modal');
let overlay = document.querySelector('.overlay');
let closeModalButton = document.querySelector('.close-modal');

showModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
});

overlay.addEventListener('click', () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
});

closeModalButton.addEventListener('click', () => {
  overlay.classList.add('hidden');
  modal.classList.add('hidden');
});

document.addEventListener('keydown', ev => {
  if (
    !modal.classList.contains('hidden') ||
    !overlay.classList.contains('hidden')
  ) {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
  }
});
