import { SKElement, SKElementProps, skTime } from "../../simplekit/src/imperative-mode";

export type BusyIndicatorProps = SKElementProps & { busy?: boolean };

/**
 * BusyIndicator: a spinning ring that shows the app is busy,
 * built by extending the SimpleKit API.
 *
 * It is a cyclic animation: it doesn't show how much work is left,
 * so use it for tasks that take about 1 to 4 seconds (use a progress
 * bar for longer tasks).
 *
 * SimpleKit redraws the whole UI every frame, so the animation only
 * needs draw() to use the current time (skTime) to pick the angle.
 */
export class BusyIndicator extends SKElement {
  constructor({ busy = false, ...elementProps }: BusyIndicatorProps = {}) {
    super(elementProps);
    // a default size, if one isn't given
    this.width = elementProps.width ?? 40;
    this.height = elementProps.height ?? 40;
    this.busy = busy;
  }

  // the indicator is only drawn while busy is true
  busy: boolean;

  // style
  trackColour = "lightgrey";
  spinnerColour = "red";
  thickness = 5;
  period = 1000; // time for one turn, in ms

  draw(gc: CanvasRenderingContext2D) {
    if (this.busy) {
      gc.save();
      // move to the centre of the content box
      gc.translate(
        this.x + this.margin + this.padding + this.contentBox.width / 2,
        this.y + this.margin + this.padding + this.contentBox.height / 2,
      );

      // the ring fits inside the content box
      const radius =
        Math.min(this.contentBox.width, this.contentBox.height) / 2 -
        this.thickness / 2;
      gc.lineWidth = this.thickness;

      // the track: a full circle
      gc.strokeStyle = this.trackColour;
      gc.beginPath();
      gc.arc(0, 0, radius, 0, 2 * Math.PI);
      gc.stroke();

      // the spinner: a quarter of the circle, rotated by an angle
      // that goes from 0 to 2 PI every period
      const angle = ((skTime % this.period) / this.period) * 2 * Math.PI;
      gc.rotate(angle);
      gc.strokeStyle = this.spinnerColour;
      gc.beginPath();
      gc.arc(0, 0, radius, -Math.PI / 2, 0);
      gc.stroke();

      gc.restore();
    }

    // element draws debug viz if flag is set
    super.draw(gc);
  }
}
