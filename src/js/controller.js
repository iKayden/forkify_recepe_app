import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
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
    recipeView.renderError();
  }
};

const controlSearchResults = async function() {
  try {
    // Get search query from the form
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    const res = await model.loadSearchResult(query);
    // render results
    console.log(res);
  } catch (err) {
    console.log('err', err);
  }
};

// Publisher <-> Subscriber pattern
// This is a Subscriber function
const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
