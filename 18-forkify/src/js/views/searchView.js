import * as model from '../model.js';

class SearchView {
  #parentEl = document.querySelector('.search');

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  getQuery() {
    model.state.search.query =
      this.#parentEl.querySelector('.search__field').value;
    // const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    // return query;
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', e => {
      e.preventDefault();
      this.getQuery();
      handler();
    });
  }
}

export default new SearchView();
