declare global {
  interface CanvasRenderingContext2D {
    drawInBox(): void;
  }
}

CanvasRenderingContext2D.prototype.drawInBox = function () {
  console.log(this.canvas);
};

export {};
