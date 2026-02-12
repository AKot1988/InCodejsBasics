import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { GET_JSON } from './helpers.js';
export const state = {
  recipe: {},
  recipyParentElement: null,
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
  }
};

// https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886
