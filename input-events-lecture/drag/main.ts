/**
 * Dragging a circle
 *
 * uses a Drawable Circle
 * tracks a simple "idle" / "dragging" state
 * mousedown picks the circle up, mousemove moves it,
 * mouseup puts it down
 */

import {
  SKEvent,
  SKMouseEvent,
  setSKDrawCallback,
  setSKEventListener,
  startSimpleKit,
} from "../../simplekit/src/canvas-mode";
// local import
import { Circle } from "./circle";

const circle = new Circle(200, 200, 50, "lightblue", "black", 2);

// interaction state
let state: "idle" | "dragging" = "idle";

// offset from the circle centre to where the mouse grabbed it,
// so the circle doesn't "jump" to centre itself on the mouse
let offsetX = 0;
let offsetY = 0;

// event handler with switch statement dispatch
function handleEvent(e: SKEvent) {
  switch (e.type) {
    case "mousedown": {
      const { x, y } = e as SKMouseEvent;
      if (state == "idle" && circle.hitTest(x, y)) {
        offsetX = circle.x - x;
        offsetY = circle.y - y;
        circle.fill = "orange"; // feedback: it's picked up
        state = "dragging";
      }
      break;
    }
    case "mousemove": {
      const { x, y } = e as SKMouseEvent;
      if (state == "dragging") {
        circle.x = x + offsetX;
        circle.y = y + offsetY;
      }
      break;
    }
    case "mouseup":
      if (state == "dragging") {
        circle.fill = "lightblue";
        state = "idle";
      }
      break;
  }
}

// set the event handler
setSKEventListener(handleEvent);

// set the draw callback (using function expression)
setSKDrawCallback((gc: CanvasRenderingContext2D) => {
  gc.clearRect(0, 0, gc.canvas.width, gc.canvas.height);
  circle.draw(gc);
});

// start SimpleKit
startSimpleKit();
