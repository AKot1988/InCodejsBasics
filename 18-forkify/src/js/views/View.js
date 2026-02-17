import icons from 'url:../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    this._data = data;
    if (!this._data || (!Array.isArray(this._data) && this._data.length === 0))
      return this.renderError();
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
        <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(messagge = this._errorMessage) {
    const markup = `<div class="error">
        <div>
        <svg>
        <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        </div>
        <p>${messagge}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(messagge = this._message) {
    const markup = `<div class="message">
        <div>
        <svg>
        <use href="${icons}#icon-smile"></use>
        </svg>
        </div>
        <p>${messagge}</p>
        </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
