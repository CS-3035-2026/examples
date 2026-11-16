import { SKElement, SKElementProps } from "../simplekit/src/imperative-mode";

export type SKImageProps = SKElementProps & { src?: string };

/**
 * SKImage displays an image, built by extending the SimpleKit API.
 *
 * It takes the path to the image (src), and can be laid out like any
 * other element. If width and height are not set, it uses the size of
 * the image itself; if they are set, the image is stretched to fit.
 */
export class SKImage extends SKElement {
  protected image = new Image();

  constructor({ src = "", ...elementProps }: SKImageProps = {}) {
    super(elementProps);
    // the image loads in the background; once it has loaded its size
    // is known, so ask SimpleKit to lay out the interface again
    this.image.onload = () => this.sizeChanged();
    this.image.src = src;
  }

  get src() {
    return this.image.src;
  }
  set src(s: string) {
    this.image.src = s;
  }

  // the content size is the size of the image (0 until it has loaded)
  protected updateContentSize() {
    this.contentWidth = this.image.naturalWidth;
    this.contentHeight = this.image.naturalHeight;
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();
    gc.translate(this.x + this.margin, this.y + this.margin);

    if (this.fill) {
      gc.fillStyle = this.fill;
      gc.fillRect(0, 0, this.paddingBox.width, this.paddingBox.height);
    }

    // draw the image in the content box (inside the padding)
    if (this.image.complete && this.image.naturalWidth > 0) {
      gc.drawImage(
        this.image,
        this.padding,
        this.padding,
        this.contentBox.width,
        this.contentBox.height,
      );
    }

    if (this.border) {
      gc.strokeStyle = this.border;
      gc.lineWidth = 1;
      gc.strokeRect(0, 0, this.paddingBox.width, this.paddingBox.height);
    }

    gc.restore();

    // element draws debug viz if flag is set
    super.draw(gc);
  }
}
