import { RedHeart, BlueHeart } from './hearts';
import { PlayerState } from '../shared/stateInterface';

class Player {
  private heartsObject;

  constructor() {
    this.heartsObject = {
      RedHeart: new RedHeart(),
      BlueHeart: new BlueHeart(),
    };
  }

  draw(ctx: CanvasRenderingContext2D, playerState: PlayerState) {
    const heart = this.heartsObject[playerState.heartType];
    heart.draw(ctx, playerState.playerPos);
  }
}

export default Player;
