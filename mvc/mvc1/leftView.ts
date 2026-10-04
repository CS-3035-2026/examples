import {
  Layout,
  SKButton,
  SKContainer,
  SKElementProps,
} from "../../simplekit/src/imperative-mode";
import { LeftController } from "./leftController";
import { Model } from "./model";
import { Observer } from "./observer";

export class LeftView extends SKContainer implements Observer {
  button: SKButton = new SKButton({ text: "?", width: 100, height: 25 });

  constructor(
    props: SKElementProps,
    private model: Model,
    controller: LeftController,
  ) {
    super({ ...props, layoutMethod: new Layout.CentredLayout() });

    this.addChild(this.button);

    this.button.addEventListener("action", () => {
      controller.handleButtonPress();
    });

    this.model.addObserver(this);
  }

  update(): void {
    this.button.text = `${this.model.count}`;
  }
}
