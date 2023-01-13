import * as model from "./model.js";
import icons from "../img/icons.svg";
import recipeView from "./views/recipeView.js";
import "core-js/stable";
import "regenerator-runtime";
const recipeContainer = document.querySelector('.recipe');

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = function(parentEl) {
  const spinner = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", spinner);
};

// https://forkify-api.herokuapp.com/v2
const showRecipe = async function() {
  try {

    // GETting data
    const id = window.location.hash.slice(1);
    if (!id) return;
    // Loading data
    renderSpinner(recipeContainer);
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
["hashchange", "load"].forEach(e => window.addEventListener(e, showRecipe));
