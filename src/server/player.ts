import { Keys, HeartType, HeartMap } from './interfaces';
import { Rect } from './rectangle';
import { RedHeart, BlueHeart } from './hearts';

type PlayerHeartMap = HeartMap<RedHeart, BlueHeart>;
type PlayerHeartType = HeartType<RedHeart, BlueHeart>;

class Player {
  private SPEED = 2;
  private box: Rect;
  private heart: RedHeart | BlueHeart;
  private lastTimeSwitched: number;
  private switchDelay = 200;
  private createHeartMap: PlayerHeartMap;

  constructor(box: Rect) {
    this.box = box;
    this.heart = new RedHeart(this.box.center, this.SPEED);
    this.lastTimeSwitched = Date.now();
    this.createHeartMap = {
      RedHeart: () =>
        (this.heart = new RedHeart(this.heart.rect.center, this.SPEED)),
      BlueHeart: () =>
        (this.heart = new BlueHeart(
          this.box,
          this.heart.rect.center,
          this.SPEED
        )),
    };
  }

  private checkAndPlaceInsideBox() {
    // top
    if (this.box.top > this.heart.rect.top) this.heart.rect.top = this.box.top;
    // right
    if (this.box.right < this.heart.rect.right)
      this.heart.rect.right = this.box.right;
    // bottom
    if (this.box.bottom < this.heart.rect.bottom)
      this.heart.rect.bottom = this.box.bottom;
    // left
    if (this.box.left > this.heart.rect.left)
      this.heart.rect.left = this.box.left;
  }

  private canSwitch() {
    const currentTime = Date.now();
    return this.lastTimeSwitched + this.switchDelay <= currentTime;
  }

  private switchHeart(heartType?: PlayerHeartType) {
    if (!heartType) {
      heartType = 'RedHeart';
      if (this.heart instanceof RedHeart) heartType = 'BlueHeart';
    }
    if (!this.canSwitch()) return;
    this.heart = this.createHeartMap[heartType]();
    this.lastTimeSwitched = Date.now();
  }

  inputs(keys: Keys) {
    this.heart.inputs(keys);
    if (keys.fire.pressed) {
      this.switchHeart();
    }
  }

  update(keys: Keys) {
    this.heart.update();
    this.inputs(keys);
    this.checkAndPlaceInsideBox();
  }
}

export default Player;
