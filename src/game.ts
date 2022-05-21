import RectObject, { Rect } from './rectangle';
import InputHandler from './inputs';
import { FightBoxType, Keys } from './interfaces';
import Player from './player';
import FightBox from './fightBox';

class Game {
  private ctx: CanvasRenderingContext2D;
  private screen: Rect;
  private fightBox: FightBox;
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
    this.fightBox = new FightBox(this.screen);
    this.player = new Player(this.fightBox.innerBox);
  }

  update() {
    this.player.update(this.keys);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    this.fightBox.draw(this.ctx);
    this.player.draw(this.ctx);
  }
}

export default Game;
