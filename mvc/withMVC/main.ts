import {
    startSimpleKit,
    setSKRoot,
    SKContainer,
    Layout,
} from "../../simplekit/src/imperative-mode";
import { Model } from "./model";
import { ViewTop } from "./viewTop";
import { ViewBottom } from "./viewBottom";
import { Controller } from "./controller";

// Declare sizes for the main panel
const panelWidth:number = 350;
const panelHeight:number = 500;

// Create the root element
const root = new SKContainer();
root.fill = "lightgrey";
root.layoutMethod = new Layout.CentredLayout();

// Create the panel
const panel = new SKContainer({ width: panelWidth, height: panelHeight });
panel.fill = "white";
panel.border = "black";
panel.layoutMethod = new Layout.WrapRowLayout();

// Create the model. Create controller and views, set the model
const model = new Model();
const controller = new Controller(model);

// Views extend SKContainer
const topView = new ViewTop({ width: panelWidth, height: panelHeight/1.25 }, model);
topView.layoutMethod = new Layout.WrapRowLayout();

const bottomView = new ViewBottom({ width: panelWidth, height: panelHeight/5 }, model);
bottomView.layoutMethod = new Layout.CentredLayout();
bottomView.fill = "lightblue";

// Add views as observers
model.addObserver(topView);
model.addObserver(bottomView);

// Link view events to the controller
bottomView.setButtonEvent(controller);

root.addChild(panel);
panel.addChild(topView);
panel.addChild(bottomView);

setSKRoot(root);
startSimpleKit();
