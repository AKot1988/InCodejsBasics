import icons from 'url:../../img/icons.svg';
import View from './View.js';
import { state } from '../model.js';
import { Fraction } from '../../utils/fraction.js';

export class AddRecipeView extends View {
  _parentElement = document.querySelector('.pagination');

  _addButton = document.querySelector('.nav__btn--add-recipe');
  _closeButton = document.querySelector('.btn--close-modal');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');

  constructor() {
    super();
    this._addHandlerShowWindow();
    // this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._addButton.addEventListener('click', this.toggleWindow.bind(this));
  }
}

export default new AddRecipeView();
