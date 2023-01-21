import View from "./View.js";
import previewView from "./previewView.js";
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errMsg = "No bookmarks yet. Find a nice recipe and bookmark it ✅";
  _message = "Great Success!";


  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join("");
  }
}
export default new BookmarksView();;
