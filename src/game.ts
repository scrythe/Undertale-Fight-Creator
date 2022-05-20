import RectObject, { Rect } from './rectangle';

class Game {
  private ctx: CanvasRenderingContext2D;
  private screen: Rect;
  private fightBox: Rect;

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    const screenObject = new RectObject(width, height);
    const screenPos = {
      x: 0,
      y: 0,
    };
    this.screen = screenObject.getRect({ topLeft: screenPos });
    this.fightBox = this.createFightBox();
    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 12.5;
  }

  private createFightBox() {
    const fightBoxObject = new RectObject(250, 250);
    return fightBoxObject.getRect({ midTop: this.screen.center });
  }

  update() {}

  draw() {
    this.ctx.clearRect(0, 0, this.screen.width, this.screen.height);
    this.ctx.strokeRect(
      this.fightBox.x,
      this.fightBox.y,
      this.fightBox.width,
      this.fightBox.height
    );
  }
}

export default Game;
