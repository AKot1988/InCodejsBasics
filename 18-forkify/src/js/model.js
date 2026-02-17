import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { GET_JSON } from './helpers.js';
import { PAGE, RES_PER_PAGE } from './config.js';
export const state = {
  recipe: {},
  recipyParentElement: null,
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    currentPage: PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await GET_JSON(API_URL, id);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};
export const loadSearchResults = async function () {
  try {
    const data = await GET_JSON(`${API_URL}?search=${state.search.query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

export function getSearchResltsPage(page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
}

// loadSearchResults('pasta');

// https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886
