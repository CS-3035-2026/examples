/**
 * This is an example application that demonstrates the use of a
 * StackPane, a container that was built by extending the SimpleKit API.
 *
 * The StackPane has three children: a large blue square, a smaller
 * yellow square, and a button. Each one is centred in the pane, and
 * each is drawn on top of the one added before it, so the button is
 * on top.
 */
import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  SKButton,
  Layout,
} from "../simplekit/src/imperative-mode";
import { StackPane } from "./stackpane";

// Creating the root element with a grey background
const root = new SKContainer();
root.fill = "lightgrey";
root.layoutMethod = new Layout.CentredLayout();

// Creating a white StackPane in the centre of the root
const stack = new StackPane({ width: 300, height: 200 });
stack.fill = "white";
stack.border = "black";
root.addChild(stack);

// The first child is at the bottom of the stack
const bottom = new SKContainer({ width: 160, height: 160 });
bottom.fill = "lightblue";
stack.addChild(bottom);

// The second child is drawn on top of the first
const middle = new SKContainer({ width: 110, height: 110 });
middle.fill = "khaki";
stack.addChild(middle);

// The last child is on top, so it is the one that gets mouse events
const button = new SKButton({ text: "On top" });
button.addEventListener("action", () => {
  console.log("button clicked");
});
stack.addChild(button);

// Set the root element and start SimpleKit
setSKRoot(root);
startSimpleKit();
