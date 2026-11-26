/*
 * declarative-h: hyperscript h() function calls describe WHAT the UI
 * tree is, including the event handler, so it is all declarative.
 *
 * h(type, props, children) creates a virtual DOM node (a JavaScript
 * object), and Preact's render() creates the real DOM from it.
 */
import { h, render } from "preact";

// state
let clicked = false;
function setClicked(value: boolean) {
  clicked = value;
  update();
}

// create the UI tree for the app
function App() {
  return h("div", { class: "container" }, [
      h("p", null, clicked ? "CLICKED" : "declarative-h"),
      h("button", { onClick: () => setClicked(true) }, "Ok")
  ]);
}

// when state changes, re-render the app
function update() {
  render(App(),
    document.querySelector("#app") as Element);
}

// initial render
update();
