import RectObject, { Rect } from './rectangle';
import InputHandler from './inputs';
import { Keys } from './interfaces';
import Player from './player';

class Game {
  private ctx: CanvasRenderingContext2D;
  private screen: Rect;
  private fightBox: Rect;
  private keys: Keys;
  private player: Player;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    const screenObject = new RectObject(width, height);
    const screenPos = {
      x: 0,
      y: 0,
    };
    this.screen = screenObject.getRect({ topLeft: screenPos });
    const inputHandler = new InputHandler();
    this.keys = inputHandler.keys;
    this.fightBox = this.createFightBox();
    this.player = new Player(this.fightBox);
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 12.5;
  }

  private createFightBox() {
    const fightBoxObject = new RectObject(250, 250);
    return fightBoxObject.getRect({ midTop: this.screen.center });
  }

  update() {
    this.player.update(this.keys);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    this.fightBox.draw(this.ctx, 'stroke');
    this.player.draw(this.ctx);
  }
}

export default Game;
