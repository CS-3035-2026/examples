/*
 * declarative-jsx: JSX describes WHAT the UI tree is, with a mix of
 * HTML-like markup and JavaScript expressions in { }.
 *
 * JSX is compiled into hyperscript-like function calls (see the
 * jsx settings in this folder's tsconfig.json), and Preact renders
 * them to the DOM.
 */
import { render } from "preact";

// state
let clicked = false;
function setClicked(value: boolean) {
  clicked = value;
  update();
}

// create the UI tree for the app
function App() {
  return (
    <div class="container">
      <p>{clicked ? "CLICKED" : "declarative-jsx"}</p>
      <button onClick={() => setClicked(true)}>Ok</button>
    </div>
  );
}

// when state changes, re-render the app
function update() {
  render(<App />,
    document.querySelector("#app") as Element);
}

// initial render
update();
