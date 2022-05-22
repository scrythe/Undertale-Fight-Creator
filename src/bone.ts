import RectObject, { Rect } from './rectangle';
import { Speed } from './interfaces';
class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;
  private MAX_SPEED = 2;
  private _rect: Rect;
  private speed: Speed;
  private frame;

  constructor(box: Rect) {
    const boneObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = boneObject.getRect({ center: box.center });
    this.speed = { x: 0, y: 0 };
    this.frame = 0;
  }

  updateState() {
    if (this.frame <= 50) {
      this.speed.x = 0;
      this.speed.y = -this.MAX_SPEED;
    } else if (this.frame <= 100) {
      this.speed.x = this.MAX_SPEED;
      this.speed.y = 0;
    } else if (this.frame <= 150) {
      this.speed.x = 0;
      this.speed.y = this.MAX_SPEED;
    } else if (this.frame <= 200) {
      this.speed.x = -this.MAX_SPEED;
      this.speed.y = 0;
    } else {
      this.speed.x = 0;
      this.speed.y = 0;
    }
  }

  update() {
    this.updateState();
    this._rect.x += this.speed.x;
    this._rect.y += this.speed.y;
    this.frame += 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'gray';
    this._rect.draw(ctx, { inBox: true });
  }
}

export default Bone;
