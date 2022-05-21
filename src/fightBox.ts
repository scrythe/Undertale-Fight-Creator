import RectObject, { Rect } from './rectangle';
import { FightBoxType } from './interfaces';

class FightBox {
  private fightBox: FightBoxType;
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
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'white';
    this.fightBox.outer.draw(ctx);
    ctx.fillStyle = 'black';
    this.fightBox.inner.draw(ctx);
  }

  get innerBox() {
    return this.fightBox.inner;
  }

  get outerBox() {
    return this.fightBox.outer;
  }
}

export default FightBox;
