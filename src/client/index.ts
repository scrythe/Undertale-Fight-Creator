import Game from './game';
import './customCtx';

const WIDTH = 960;
const HEIGHT = 720;
const FPS = 60;
const MS_PER_UPDATE = 1000 / FPS;
const canvas = document.querySelector('canvas')!;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d')!;

const game = new Game(ctx, WIDTH, HEIGHT);

let previous = performance.now();
let lag = 0;

function gameLoop(current: number) {
  const timeDiffrence = current - previous;
  lag += timeDiffrence;
  while (lag >= MS_PER_UPDATE) {
    game.update();
    lag -= MS_PER_UPDATE;
  }
  game.draw();
  previous = current;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
