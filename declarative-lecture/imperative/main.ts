/*
 * imperative: code describes HOW to build the UI tree, one step at a
 * time, using DOM methods (createElement, appendChild, ...)
 */

// state
let clicked = false;
function setClicked(value: boolean) {
  clicked = value;
  update();
}

// create the UI tree for the app
function App() {
  const container = document.createElement("div");
  container.classList.add("container");

  const label = document.createElement("p");
  label.innerText = clicked ? "CLICKED" : "imperative";
  container.appendChild(label);

  const button = document.createElement("button");
  button.innerText = "Ok";
  container.appendChild(button);

  button.addEventListener("click", () => {
    setClicked(true);
  });

  return container;
}

// when state changes, re-render the app
function update() {
  const root = document.querySelector("#app") as Element;
  root.replaceChildren(App());
}

// initial render
update();
