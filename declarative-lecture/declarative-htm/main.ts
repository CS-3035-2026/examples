/*
 * declarative-htm: HTM = HyperScript Tagged Templates
 *
 * The html tagged template describes WHAT the UI tree is, including
 * the event handler, so it is all declarative. htm turns the template
 * into hyperscript h() calls, and Preact renders them to the DOM.
 */
import { html } from "htm/preact";
import { render } from "preact";

// state
let clicked = false;
function setClicked(value: boolean) {
  clicked = value;
  update();
}

// create the UI tree for the app
export function App() {
  return html`
    <div class="container">
      <p>${clicked ? "CLICKED" : "declarative-htm"}</p>
      <button onClick=${() => setClicked(true)}>Ok</button>
    </div>
  `;
}

// when state changes, re-render the app
function update() {
  render(html`<${App} />`,
    document.querySelector("#app") as Element);
}

// initial render
update();
