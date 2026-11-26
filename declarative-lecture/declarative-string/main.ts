/*
 * declarative-string: an HTML string describes WHAT the UI tree is,
 * and innerHTML turns the string into DOM nodes
 */

/*
 * html is a "tagged template" function: here it just joins the
 * template literal into a string, like an untagged template would.
 * Tagging it lets VS Code extensions (e.g. lit-html) highlight the
 * HTML inside the template.
 */
const html = String.raw;

// state
let clicked = false;
function setClicked(value: boolean) {
  clicked = value;
  update();
}

// create the UI tree for the app
function renderApp(root: Element) {
  root.innerHTML = html`
    <div class="container">
      <p>${clicked ? "CLICKED" : "declarative-string"}</p>
      <button>Ok</button>
    </div>
  `;
  // but the add listener code is imperative
  document.querySelector("button")
    ?.addEventListener("click", () => {
      setClicked(true);
    });
}

// when state changes, re-render the app
function update() {
  const root =
    document.querySelector("#app") as Element;
  renderApp(root);
}

// initial render
update();
