import { Keys } from './interfaces';
import { Rect } from './rectangle';
import { RedHeart, BlueHeart } from './hearts';

class Player {
  private SPEED = 2;
  private box: Rect;
  private heart: RedHeart;
  constructor(box: Rect) {
    this.box = box;
    const playerStartPos = this.box.center;
    this.heart = new BlueHeart(this.box, playerStartPos, this.SPEED);
  }

  private checkAndPlaceInsideBox() {
    const lineWidth = 6;
    // top
    if (this.box.top + lineWidth > this.heart.rect.top)
      this.heart.rect.top = this.box.top + lineWidth;
    // right
    if (this.box.right - lineWidth < this.heart.rect.right)
      this.heart.rect.right = this.box.right - lineWidth;
    // bottom
    if (this.box.bottom - lineWidth < this.heart.rect.bottom)
      this.heart.rect.bottom = this.box.bottom - lineWidth;
    // left
    if (this.box.left + lineWidth > this.heart.rect.left)
      this.heart.rect.left = this.box.left + lineWidth;
  }

  update(keys: Keys) {
    this.heart.update(keys);
    this.checkAndPlaceInsideBox();
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.heart.draw(ctx);
  }
}

export default Player;
