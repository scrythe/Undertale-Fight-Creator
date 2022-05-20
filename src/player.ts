import { Keys } from './interfaces';
import RectObject, { Rect } from './rectangle';
class Player {
  private WIDTH = 16;
  private HEIGHT = 16;
  private SPEED = 2;
  private box: Rect;
  private rect: Rect;
  constructor(box: Rect) {
    this.box = box;
    const playerObject = new RectObject(this.WIDTH, this.HEIGHT);
    const playerStartPos = this.box.center;
    this.rect = playerObject.getRect({ center: playerStartPos });
  }

  private checkAndPlaceInsideBox() {
    const lineWidth = 6;
    // top
    if (this.box.top + lineWidth > this.rect.top)
      this.rect.top = this.box.top + lineWidth;
    // right
    if (this.box.right - lineWidth < this.rect.right)
      this.rect.right = this.box.right - lineWidth;
    // bottom
    if (this.box.bottom - lineWidth < this.rect.bottom)
      this.rect.bottom = this.box.bottom - lineWidth;
    // left
    if (this.box.left + lineWidth > this.rect.left)
      this.rect.left = this.box.left + lineWidth;
  }

  private inputs(keys: Keys) {
    // up or down
    if (keys.up.pressed && keys.down.pressed) {
      return;
    } else if (keys.up.pressed) {
      this.rect.y -= this.SPEED;
    } else if (keys.down.pressed) {
      this.rect.y += this.SPEED;
    }

    // right or left
    if (keys.right.pressed && keys.left.pressed) {
      return;
    } else if (keys.right.pressed) {
      this.rect.x += this.SPEED;
    } else if (keys.left.pressed) {
      this.rect.x -= this.SPEED;
    }
  }

  update(keys: Keys) {
    this.inputs(keys);
    this.checkAndPlaceInsideBox();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green';
    this.rect.draw(ctx, 'fill');
  }
}

export default Player;
