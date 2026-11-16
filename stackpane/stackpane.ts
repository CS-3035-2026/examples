import {
  Layout,
  SKContainer,
  SKContainerProps,
} from "../simplekit/src/imperative-mode";

/**
 * A StackPane draws its children on top of one another, each one
 * centred horizontally and vertically in the pane. The first child
 * added is at the bottom, and each child added after it is drawn on top.
 *
 * It extends SimpleKit without changing the SimpleKit code: it is an
 * SKContainer that always uses SimpleKit's CentredLayout, which centres
 * every child in the container.
 */
export class StackPane extends SKContainer {
  constructor(props: SKContainerProps = {}) {
    super({ ...props, layoutMethod: new Layout.CentredLayout() });
  }
}
