import RectObject, { Rect } from '@shared/rectangle';
import Player from './player';
import FightBox from './fightBox';
import BoneWave from './boneWave';
import { State } from '@shared/stateInterface';

class Game {
  private ctx: CanvasRenderingContext2D;
  private screen: Rect;
  private fightBox: FightBox;
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
    this.fightBox = new FightBox(this.screen);
    this.player = new Player();
    this.bonesWave = new BoneWave();
  }

  draw(state: State) {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    this.fightBox.draw(this.ctx);
    this.player.draw(this.ctx, state.playerPos);
    this.bonesWave.draw(this.fightBox.ctxBox, state.boneStates);
    this.fightBox.drawBoxToScreen(this.ctx);
  }
}

export default Game;
