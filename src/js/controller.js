import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime";

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(error);
  }
};

// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipes));
