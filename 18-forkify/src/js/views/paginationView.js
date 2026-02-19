import icons from 'url:../../img/icons.svg';
import View from './View.js';
import { state } from '../model';
import { Fraction } from '../../utils/fraction.js';

export class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateMarkup() {
    //вираховуємо загальну кількість сторінок по категорії
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    //     //Коли ми на першій сторінці і сторінок більше за 1
    if (this._data.currentPage === 1 && numPages > 1) {
      return `

        <button data-goto=${this._data.currentPage + 1} class="btn--inline pagination__btn--next">
              <svg class="search__icon">
               <use href="${icons}.svg#icon-arrow-right"></use>
              </svg>
              <span>Page ${this._data.currentPage + 1}</span>
            </button>
        `;
    }
    //Коли ми на останній сторінці і сторінок більше за 1
    if (this._data.currentPage === numPages && numPages > 1) {
      return `<button data-goto=${this._data.currentPage - 1} class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
               <use href="${icons}.svg#icon-arrow-left"></use>
              </svg>
              <span>Page ${this._data.currentPage - 1}</span>
            </button>
        `;
    }
    //коли ми на першій сторінці і сторінок рівно 1
    if (this._data.currentPage === numPages && numPages === 1) {
      return ``;
    }
    //Коли ми на будь-якій іншій сторінці, окрім першої і сторінок більше за 1
    if (this._data.currentPage > 1 && this._data.currentPage < numPages) {
      return `
        <button data-goto=${this._data.currentPage - 1} class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
               <use href="${icons}.svg#icon-arrow-left"></use>
              </svg>
              <span>Page ${this._data.currentPage - 1}</span>
            </button>
      
        <button data-goto=${this._data.currentPage + 1} class="btn--inline pagination__btn--next">
              <svg class="search__icon">
               <use href="${icons}.svg#icon-arrow-right"></use>
              </svg>
              <span>Page ${this._data.currentPage + 1}</span>
            </button>
        `;
    }
  }
}

export default new PaginationView();
