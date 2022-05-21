const canvasBox = document.createElement('canvas');
const _ctxBox = canvasBox.getContext('2d')!;

class customCanvas extends HTMLCanvasElement {
  getCustomContext(
    options?: CanvasRenderingContext2DSettings | undefined
  ): CanvasRenderingContext2D | null {
    return super.getContext('2d', options);
  }
}

class customCanvasContext extends CanvasRenderingContext2D {
  customMethod() {}
}
