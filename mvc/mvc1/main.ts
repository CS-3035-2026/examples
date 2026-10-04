import {
  Layout,
  SKContainer,
  setSKRoot,
  startSimpleKit,
} from "../../simplekit/src/imperative-mode";
import { Model } from "./model";
import { LeftController } from "./leftController";
import { LeftView } from "./leftView";
import { RightView } from "./rightView";

const BOX_SIZE = 200;
const GAP = 20;

const root = new SKContainer();
root.fill = "lightgrey";
root.layoutMethod = new Layout.CentredLayout();

const panel = new SKContainer({
  width: BOX_SIZE * 2 + GAP,
  height: BOX_SIZE,
  layoutMethod: new Layout.WrapRowLayout({ gap: GAP }),
});

const model = new Model();
const controller = new LeftController(model);

const leftView = new LeftView(
  { width: BOX_SIZE, height: BOX_SIZE, fill: "white", border: "grey" },
  model,
  controller,
);
const rightView = new RightView(
  {
    width: BOX_SIZE,
    height: BOX_SIZE,
    fill: "white",
    border: "grey",
    padding: 10,
  },
  model,
);

panel.addChild(leftView);
panel.addChild(rightView);
root.addChild(panel);

setSKRoot(root);
startSimpleKit();
