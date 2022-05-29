import RectObject, { Rect } from './rectangle';
import { Speed, Attack, BoneData } from './interfaces';

class Bone {
  private WIDTH = 10;
  private HEIGHT = 50;
  private _rect: Rect;
  private speed: Speed;
  private frame: number;
  private attacks: Attack[];
  private currentAttack: Attack;
  private defaultAttack: Attack = {
    speed: {
      x: 0,
      y: 0,
    },
    end: 0,
  };
  private end: number;

  constructor({ position, attacks, end }: BoneData) {
    const boneObject = new RectObject(this.WIDTH, this.HEIGHT);
    this._rect = boneObject.getRect({ topLeft: position });
    this.speed = { x: 0, y: 0 };
    this.frame = 0;
    this.attacks = attacks;
    this.currentAttack = this.attacks[0];
    this.end = end;
    this.updateState();
  }

  private updateAttackSequence() {
    if (this.frame <= this.currentAttack.end) return;
    const currentAttackIndex = this.attacks.indexOf(this.currentAttack);
    const newAttackIndex = currentAttackIndex + 1;
    if (this.isAttackSequenceFinished(newAttackIndex))
      this.finishAttackSequence();
    this.currentAttack = this.attacks[newAttackIndex] || this.defaultAttack;
    this.updateState();
  }

  private isAttackSequenceFinished(newAttackIndex: number) {
    return newAttackIndex >= this.attacks.length;
  }

  private finishAttackSequence() {
    this.updateAttackSequence = () => {};
  }

  private updateState() {
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

  isBoneFinished() {
    return this.frame >= this.end;
  }
}

export default Bone;