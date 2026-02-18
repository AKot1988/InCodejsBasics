import icons from 'url:../img/icons.svg'; // Parcel 2
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { has } from 'core-js/core/dict';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
// if (!model.state.recipyParentElement) {
//   model.state.recipyParentElement = document.querySelector('.recipe');
// }
// console.log(state.recipyParentElement);

if (module.hot) {
  module.hot.accept();
}

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(model.state.recipe);

    // controlServings();
    recipeView.render(model.state.recipe);

    // if (!res.ok) {
    //   throw new Error(`${data.message} (${res.status})`);
    // }
    // const markup = generateMarkup(model.state.recipe);
    // model.state.recipyParentElement.innerHTML = '';
    // model.state.recipyParentElement.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // await model.loadSearchResults(model.state.search.query);
    await model.loadSearchResults(model.state.search.results);
    resultsView.render(
      model.getSearchResltsPage(model.state.search.currentPage),
    );
    // recipeView.render(model.state.search.results);

    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResltsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // console.log(model.state.recipe);
  model.updateServings(newServings);
  // console.log(model.state.recipe);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipies);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();

// document.querySelector('.search').addEventListener('submit', function (e) {
//   e.preventDefault();
//   model.state.search.results = document.querySelector('.search__field').value;
//   controlSearchResults();
// });
