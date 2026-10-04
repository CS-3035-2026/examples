import {
  Layout,
  SKContainer,
  SKElementProps,
  SKLabel,
} from "../../simplekit/src/imperative-mode";
import { Model } from "./model";
import { Observer } from "./observer";

export class RightView extends SKContainer implements Observer {
  constructor(
    props: SKElementProps,
    private model: Model,
  ) {
    super({ ...props, layoutMethod: new Layout.WrapRowLayout({ gap: 8 }) });

    this.model.addObserver(this);
  }

  update(): void {
    this.clearChildren();
    for (let i = 0; i < this.model.count; i++) {
      const square = new SKLabel({ width: 50, height: 50, text: `${i + 1}` });
      square.fill = "lightgreen";
      this.addChild(square);
    }
  }
}
