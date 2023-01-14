import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import "core-js/stable";
import "regenerator-runtime";

// Keeps the state of the app after code has been changed
if (module.hot) {
  module.hot.accept();
}


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
    resultsView.renderSpinner();
    // Get search query from the form
    const query = searchView.getQuery();
    if (!query) return;

    // load search results
    await model.loadSearchResult(query);
    // render results
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
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
