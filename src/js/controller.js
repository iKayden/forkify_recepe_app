import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime";


// https://forkify-api.herokuapp.com/v2
const controlRecipes = async function() {
  try {
    // GETting data
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Loading data
    recipeView.renderSpinner();
    // Loading and storing current data in a state
    await model.loadRecipe(id);

    // Rendering Received Data
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

// Publisher <-> Subscriber pattern
// This is a Subscriber function
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
}();
