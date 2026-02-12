import icons from 'url:../img/icons.svg'; // Parcel 2
import * as model from './model.js';
import { state } from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { has } from 'core-js/core/dict';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
if (!state.recipyParentElement) {
  state.recipyParentElement = document.querySelector('.recipe');
}
// console.log(state.recipyParentElement);

const controlRecipies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    recipeView.render(state.recipe);

    if (!res.ok) {
      throw new Error(`${data.message} (${res.status})`);
    }
    const markup = generateMarkup(model.state.recipe);
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipies),
);
