import RectObject, { Rect } from './rectangle';
import { Speed } from './interfaces';

const MAX_SPEED = 2;
class AttackOption {
  speed: Speed;
  end: number;
  constructor(speed: Speed, end: number) {
    this.speed = speed;
    this.end = end;
  }
}

const options = [
  new AttackOption({ x: 0, y: -MAX_SPEED }, 50),
  new AttackOption({ x: MAX_SPEED, y: 0 }, 100),
  new AttackOption({ x: 0, y: MAX_SPEED }, 150),
  new AttackOption({ x: -MAX_SPEED, y: 0 }, 200),
  new AttackOption({ x: MAX_SPEED, y: 0 }, 250),
  new AttackOption({ x: -MAX_SPEED, y: 0 }, 400),
  new AttackOption({ x: MAX_SPEED, y: 0 }, 500),
];

class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;
  private _rect: Rect;
  private speed: Speed;
  private frame;
  private options: AttackOption[];
  private currentAttack: AttackOption;

  constructor(box: Rect) {
    const boneObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = boneObject.getRect({ center: box.center });
    this.speed = { x: 0, y: 0 };
    this.frame = 0;
    this.options = options;
    this.currentAttack = this.options[0];
    this.updateState();
  }

  updateAttackSequence() {
    if (this.frame > this.currentAttack.end) {
      const currentAttackIndex = this.options.indexOf(this.currentAttack);
      const newAttack = this.options[currentAttackIndex + 1];
      this.currentAttack = newAttack;
      this.updateState();
    }
  }

  updateState() {
    this.speed.x = this.currentAttack.speed.x;
    this.speed.y = this.currentAttack.speed.y;
  }

  update() {
    this.updateAttackSequence();
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
