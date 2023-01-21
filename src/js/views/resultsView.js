import View from "./View.js";
import previewView from "./previewView.js";

class ResultView extends View {
  _parentElement = document.querySelector(".results");
  _errMsg = "No recipes found for your query! Please, try something else 🥙";
  _message = "Great Success!";

  _generateMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join("");
  }

}
export default new ResultView();;
