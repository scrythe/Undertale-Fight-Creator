import { Keys } from './interfaces';

class Player {
  private keys: Keys;
  private ctx: CanvasRenderingContext2D;

  constructor(keys: Keys, ctx: CanvasRenderingContext2D) {
    this.keys = keys;
    this.ctx = ctx;
  }

  update() {
    console.log(this.keys.up.pressed);
  }

  draw() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(0, 0, 20, 20);
  }
}

export default Player;
