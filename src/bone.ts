import RectObject, { Rect } from './rectangle';
class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;
  private SPEED = 2;
  private _rect: Rect;

  constructor(box: Rect) {
    const boneObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = boneObject.getRect({ center: box.center });
  }

  private moveTop() {
    this._rect.y -= this.SPEED;
  }

  private moveRight() {
    this._rect.x += this.SPEED;
  }
  private moveDown() {
    this._rect.y += this.SPEED;
  }
  private moveLeft() {
    this._rect.x -= this.SPEED;
  }

  update() {
    // this.moveTop();
    // this.moveRight();
    this.moveDown();
    // this.moveLeft();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'gray';
    this._rect.draw(ctx, { inBox: true });
  }
}

export default Bone;
