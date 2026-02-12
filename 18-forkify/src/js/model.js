export const state = {
  recipe: {},
  recipyParentElement: null,
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
    );
    const data = await res.json();
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
    throw new Error(`${err} 💥💥💥 error RECIPY loading`);
  }
};

// https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc886
