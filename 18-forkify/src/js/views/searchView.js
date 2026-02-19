import * as model from '../model.js';
import View from './View.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search__field');
  getQuery() {
    model.state.search.query = this._parentElement.value;
    console.log(model.state.search.query);
    this._clear();
  }
  addHandlerSearch(handler) {
    this._parentElement.closest('.search').addEventListener('submit', e => {
      e.preventDefault();
      this.getQuery();
      handler();
    });
  }
}

export default new SearchView();
