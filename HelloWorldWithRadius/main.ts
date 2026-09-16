/**
 * This example builds on "Hello World with Style" to show a label nested
 * inside a container, where the container and the label are each styled
 * with their own fill and border colours, and the container uses the
 * `radius` property to round its corners. The label uses `fontColour` to
 * set its text colour independently of its fill.
 *
 * Try changing `panel.radius` below to 0 to see square corners, or to a
 * larger number for a more rounded (pill-like) shape.
 */
import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  SKLabel,
  Layout,
} from "../simplekit/src/imperative-mode";

// Root element fills the window with a plain background
const root = new SKContainer();
root.fill = "gainsboro";
root.layoutMethod = new Layout.CentredLayout();

// A panel container nested inside root. Note the new `radius` property,
// which rounds the corners of the container's fill and border.
const panel = new SKContainer({ width: 300, height: 150 });
panel.fill = "mediumpurple";
panel.border = "indigo";
panel.radius = 24; // try 0 for square corners, or a bigger number
panel.layoutMethod = new Layout.CentredLayout();

// A label nested inside the panel. Note the new `fontColour` property,
// which sets the text colour separately from the label's own fill.
const label = new SKLabel({ text: "Hello World!" });
label.fill = "gold";
label.border = "black";
label.fontColour = "darkslategray";

// Build the tree: root -> panel -> label
panel.addChild(label);
root.addChild(panel);

// Set the root element and start SimpleKit
setSKRoot(root);
startSimpleKit();

