/**
 * This is an example application that demonstrates the use of an
 * SKImage, an element that was built by extending the SimpleKit API.
 *
 * The application lays out three images in a row: one at the size of
 * the image file, one stretched to a set size, and one with padding
 * and a border.
 */
import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
} from "../simplekit/src/imperative-mode";
import { SKImage } from "./skimage";

// Creating the root element with a grey background
const root = new SKContainer();
root.fill = "lightgrey";
root.layoutMethod = new Layout.CentredLayout();

// Creating a white panel that lays out its children in a row
const panel = new SKContainer({ width: 500, height: 200 });
panel.fill = "white";
panel.padding = 20;
panel.layoutMethod = new Layout.WrapRowLayout({ gap: 20 });
root.addChild(panel);

// No size set, so the image is shown at its own size (160 x 120)
const image = new SKImage({ src: "./sun.svg" });
panel.addChild(image);

// A size is set, so the image is stretched to fit it
const small = new SKImage({ src: "./sun.svg", width: 80, height: 60 });
panel.addChild(small);

// Padding and a border work as they do for other elements
const framed = new SKImage({
  src: "./sun.svg",
  width: 100,
  height: 75,
  padding: 6,
  border: "black",
});
panel.addChild(framed);

// Set the root element and start SimpleKit
setSKRoot(root);
startSimpleKit();
