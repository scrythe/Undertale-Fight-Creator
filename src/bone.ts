import RectObject, { Rect } from './rectangle';
import { Speed } from './interfaces';
import options from './options.json';

const { attacks } = options;

class AttackOption {
  speed: Speed;
  end: number;
  constructor(speed: Speed, end: number) {
    this.speed = speed;
    this.end = end;
  }
}

class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;
  private _rect: Rect;
  private speed: Speed;
  private frame;
  private attacks: AttackOption[];
  private currentAttack: AttackOption;

  constructor(box: Rect) {
    const boneObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = boneObject.getRect({ center: box.center });
    this.speed = { x: 0, y: 0 };
    this.frame = 0;
    this.attacks = attacks;
    this.currentAttack = this.attacks[0];
    this.updateState();
  }

  updateAttackSequence() {
    if (this.frame > this.currentAttack.end) {
      const currentAttackIndex = this.attacks.indexOf(this.currentAttack);
      const newAttack = this.attacks[currentAttackIndex + 1];
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
