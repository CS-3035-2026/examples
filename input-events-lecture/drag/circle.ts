import { Drawable } from "./drawable";

export class Circle implements Drawable {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public fill?: string, // optional parameters
    public stroke?: string,
    public lineWidth?: number
  ) {}

  // is the point (mx, my) inside this circle?
  hitTest(mx: number, my: number) {
    const dx = mx - this.x;
    const dy = my - this.y;
    return Math.sqrt(dx * dx + dy * dy) < this.radius;
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.beginPath();
    if (this.fill) gc.fillStyle = this.fill;
    if (this.stroke) gc.strokeStyle = this.stroke;
    if (this.lineWidth) gc.lineWidth = this.lineWidth;
    gc.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    if (this.fill) gc.fill();
    if (this.lineWidth) gc.stroke();
  }
}
