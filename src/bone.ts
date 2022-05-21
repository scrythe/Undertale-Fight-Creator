import RectObject, { Rect } from './rectangle';
import FightBox from './fightBox';
class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;
  private _rect: Rect;

  constructor(box: Rect) {
    const boneObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = boneObject.getRect({ center: box.midBottom });
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'gray';
    this._rect.draw(ctx);
  }
}

export default Bone;
