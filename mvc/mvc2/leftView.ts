import {
  Layout,
  SKButton,
  SKContainer,
  SKElementProps,
} from "../../simplekit/src/imperative-mode";
import { Model } from "./model";
import { Observer } from "./observer";

export class LeftView extends SKContainer implements Observer {
  button: SKButton = new SKButton({ text: "?", width: 100, height: 25 });

  constructor(
    props: SKElementProps,
    private model: Model,
  ) {
    super({ ...props, layoutMethod: new Layout.CentredLayout() });

    this.addChild(this.button);

    this.button.addEventListener("action", () => {
      model.increment();
    });

    this.model.addObserver(this);
  }

  update(): void {
    this.button.text = `${this.model.count}`;
  }
}
