import { Keys } from './interfaces';
import RectObject, { Rect } from './rectangle';
class Player {
  private WIDTH = 16;
  private HEIGHT = 16;
  private SPEED = 2;
  private rect: Rect;
  constructor(box: Rect) {
    const playerObject = new RectObject(this.WIDTH, this.HEIGHT);
    const playerStartPos = box.center;
    this.rect = playerObject.getRect({ center: playerStartPos });
  }

  inputs(keys: Keys) {
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
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
  }
}

export default Player;
