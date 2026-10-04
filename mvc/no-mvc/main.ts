import {
  Layout,
  SKButton,
  SKContainer,
  SKLabel,
  setSKRoot,
  startSimpleKit,
} from "../../simplekit/src/imperative-mode";

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

const leftBox = new SKContainer({
  width: BOX_SIZE,
  height: BOX_SIZE,
  fill: "white",
  border: "grey",
  layoutMethod: new Layout.CentredLayout(),
});

const rightBox = new SKContainer({
  width: BOX_SIZE,
  height: BOX_SIZE,
  fill: "white",
  border: "grey",
  padding: 10,
  layoutMethod: new Layout.WrapRowLayout({ gap: 8 }),
});

let count = 0;
const button = new SKButton({ text: "0", width: 100, height: 25 });

button.addEventListener("action", () => {
  count++;
  button.text = `${count}`;

  rightBox.clearChildren();
  for (let i = 0; i < count; i++) {
    const square = new SKLabel({ width: 50, height: 50, text: `${i + 1}` });
    square.fill = "lightpink";
    rightBox.addChild(square);
  }
});

leftBox.addChild(button);
panel.addChild(leftBox);
panel.addChild(rightBox);
root.addChild(panel);

setSKRoot(root);
startSimpleKit();
