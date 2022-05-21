import RectObject, { Rect } from './rectangle';
import { FightBoxType } from './interfaces';

class FightBox {
  private fightBox: FightBoxType;
  private canvasBox: HTMLCanvasElement;
  private _ctxBox: CanvasRenderingContext2D;

  constructor(screen: Rect) {
    const outerFightBoxObject = new RectObject(250, 250);
    const outerfightBox = outerFightBoxObject.getRect({
      midTop: screen.center,
    });

    const innerFightBoxObject = new RectObject(225, 225);
    const innerFightBox = innerFightBoxObject.getRect({
      center: outerfightBox.center,
    });

    this.fightBox = {
      inner: innerFightBox,
      outer: outerfightBox,
    };

    this.canvasBox = document.createElement('canvas');
    this.canvasBox.width = this.fightBox.inner.width;
    this.canvasBox.height = this.fightBox.inner.height;
    this._ctxBox = this.canvasBox.getContext('2d')!;
  }

  drawBoxToScreen(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.canvasBox, 0, 0);
    this._ctxBox.clearRect(
      0,
      0,
      this.fightBox.inner.width,
      this.fightBox.inner.height
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    this.fightBox.outer.draw(ctx);
    ctx.fillStyle = 'black';
    this.fightBox.inner.draw(ctx);
    this.drawBoxToScreen(ctx);
  }

  get innerBox() {
    return this.fightBox.inner;
  }

  get outerBox() {
    return this.fightBox.outer;
  }

  get ctxBox() {
    return this._ctxBox;
  }
}

export default FightBox;
