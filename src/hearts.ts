import { Keys, Position } from './interfaces';
import RectObject, { Rect } from './rectangle';

class Heart {
  private WIDTH = 16;
  private HEIGHT = 16;
  protected speed: number;
  protected _rect: Rect;

  constructor(playerStartPos: Position, speed: number) {
    this.speed = speed;
    const playerObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = playerObject.getRect({ center: playerStartPos });
  }

  protected inputs(keys: Keys) {
    // right or left
    if (keys.right.pressed && keys.left.pressed) {
      return;
    } else if (keys.right.pressed) {
      this._rect.x += this.speed;
    } else if (keys.left.pressed) {
      this._rect.x -= this.speed;
    }
  }

  protected draw(ctx: CanvasRenderingContext2D) {
    this._rect.draw(ctx);
  }

  get rect() {
    return this._rect;
  }
}

export class RedHeart extends Heart {
  constructor(playerStartPos: Position, speed: number) {
    super(playerStartPos, speed);
  }

  inputs(keys: Keys) {
    super.inputs(keys);
    // up or down
    if (keys.up.pressed && keys.down.pressed) {
      return;
    } else if (keys.up.pressed) {
      this._rect.y -= this.speed;
    } else if (keys.down.pressed) {
      this._rect.y += this.speed;
    }
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'red';
    super.draw(ctx);
  }
}

export class BlueHeart extends Heart {
  private box: Rect;
  private MAX_JUMP_HEIGHT: number;
  private jumpHeight: number;
  private isJumping: boolean;
  constructor(box: Rect, playerStartPos: Position, speed: number) {
    super(playerStartPos, speed);
    this.box = box;
    this.MAX_JUMP_HEIGHT = box.width / 2;
    this.jumpHeight = 0;
    this.isJumping = false;
  }

  private isAtGroundOrBelow() {
    return this.box.bottom <= this._rect.bottom;
  }

  private matchedJumpLimit() {
    return this.MAX_JUMP_HEIGHT < this.jumpHeight;
  }

  private goUpwards() {
    if (this.matchedJumpLimit()) return (this.isJumping = false);
    this.jumpHeight += this.speed;
    this._rect.y -= this.speed;
  }

  private fallDownwards() {
    this._rect.y += this.speed;
  }

  private jump() {
    if (this.isAtGroundOrBelow()) {
      console.log('test');
      this.isJumping = true;
      this.jumpHeight = 0;
    }
    if (this.isJumping) this.goUpwards();
  }

  inputs(keys: Keys) {
    super.inputs(keys);
    // up or down
    if (keys.up.pressed) {
      this.jump();
    } else {
      this.isJumping = false;
    }
  }

  update() {
    if (!this.isJumping) this.fallDownwards();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'blue';
    super.draw(ctx);
  }
}
