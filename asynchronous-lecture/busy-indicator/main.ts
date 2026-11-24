/**
 * busy indicator: a SimpleKit widget that shows the app is busy
 * while an asynchronous task runs.
 *
 * The task is simulated with a timer that takes 3 seconds, like a
 * slow fetch. The UI stays responsive while it runs: the button
 * still gives feedback, and the indicator keeps spinning.
 */
import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  SKButton,
  SKLabel,
  Layout,
} from "../../simplekit/src/imperative-mode";
import { BusyIndicator } from "./busyindicator";

// Creating the root element with a grey background
const root = new SKContainer();
root.fill = "lightgrey";
root.layoutMethod = new Layout.CentredLayout();

// a white panel that lays out its children in a row
const panel = new SKContainer({ width: 400, height: 80 });
panel.fill = "white";
panel.padding = 20;
panel.layoutMethod = new Layout.WrapRowLayout({ gap: 20 });
root.addChild(panel);

const button = new SKButton({ text: "Start task", width: 100 });
panel.addChild(button);

const indicator = new BusyIndicator();
panel.addChild(indicator);

const status = new SKLabel({ text: "Ready", width: 160, align: "left" });
panel.addChild(status);

// a simulated task: a Promise that resolves after ms milliseconds
function task(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTask() {
  // don't start a second task while one is running
  if (indicator.busy) return;

  indicator.busy = true;
  status.text = "Working ...";

  // await gives control back to the event loop, so SimpleKit keeps
  // handling events and drawing frames while the task runs
  await task(3000);

  indicator.busy = false;
  status.text = "Done";
}

button.addEventListener("action", () => {
  runTask();
});

// Set the root element and start SimpleKit
setSKRoot(root);
startSimpleKit();
