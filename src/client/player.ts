import { RedHeart, BlueHeart } from './hearts';
import { Position } from 'interfaces';

class Player {
  private heart: RedHeart | BlueHeart;

  constructor() {
    this.heart = new RedHeart();
  }

  draw(ctx: CanvasRenderingContext2D, posisiton: Position) {
    this.heart.draw(ctx, posisiton);
  }
}

export default Player;
