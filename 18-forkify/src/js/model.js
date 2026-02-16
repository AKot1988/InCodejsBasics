import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { GET_JSON } from './helpers.js';
export const state = {
  recipe: {},
  recipyParentElement: null,
  search: {
    query: '',
    results: [],
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
    console.log(`${API_URL}?search${state.search.query}`);
    const data = await GET_JSON(`${API_URL}?search=${state.search.query}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
    console.log(state.search);
  } catch (err) {
    console.error(`${err} 💥💥💥`);
    throw err;
  }
};

// loadSearchResults('pasta');

// https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886
