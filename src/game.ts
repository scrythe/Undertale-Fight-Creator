import RectObject, { Rect } from './rectangle';
import InputHandler from './inputs';
import { Keys, BoneData } from './interfaces';
import Player from './player';
import FightBox from './fightBox';
import BoneWave from './boneWave';
import JsonData from './jsonData';

class Game {
  private ctx: CanvasRenderingContext2D;
  private screen: Rect;
  private jsonData: JsonData;
  private fightBox: FightBox;
  private keys: Keys;
  private player: Player;
  private bonesWave: BoneWave;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    const screenObject = new RectObject(width, height);
    const screenPos = {
      x: 0,
      y: 0,
    };
    this.screen = screenObject.getRect({ topLeft: screenPos });
    this.jsonData = new JsonData();
    const inputHandler = new InputHandler();
    this.keys = inputHandler.keys;
    this.fightBox = new FightBox(this.screen);
    this.player = new Player(this.fightBox.innerBox);
    this.bonesWave = new BoneWave(this.jsonData.bonesData);
  }

  update() {
    this.player.update(this.keys);
    this.bonesWave.update();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    this.fightBox.draw(this.ctx);
    this.player.draw(this.ctx);
    this.bonesWave.draw(this.fightBox.ctxBox);
    this.fightBox.drawBoxToScreen(this.ctx);
  }
}

export default Game;
