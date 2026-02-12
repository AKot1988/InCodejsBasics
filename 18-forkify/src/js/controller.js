import icons from 'url:../img/icons.svg'; // Parcel 2
import recipeView from './views/recipeView.js';
import * as model from './model.js';
import { state } from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { has } from 'core-js/core/dict';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
if (!state.recipyParentElement) {
  state.recipyParentElement = document.querySelector('.recipe');
}
function renderSpinner(parentEl) {
  const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>`;
  state.recipyParentElement.innerHTML = '';
  state.recipyParentElement.insertAdjacentHTML('afterbegin', markup);
}

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    await model.loadRecipe(id);
    recipeView.render(state.recipe);
    if (!id) return;
    renderSpinner(recipeContainer);

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

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
