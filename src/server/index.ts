import { createServer } from 'http';
import { Server } from 'socket.io';
import { ServerInterface } from 'shared/serverInterface';
import Game from './game';

const server = createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io: ServerInterface = new Server(server, options);

const WIDTH = 960;
const HEIGHT = 720;
const FPS = 60;
const MS_PER_UPDATE = 1000 / FPS;

const game = new Game(WIDTH, HEIGHT);

let previous = performance.now();
let lag = 0;

function gameLoop(current: number) {
  const timeDiffrence = current - previous;
  lag += timeDiffrence;
  while (lag >= MS_PER_UPDATE) {
    game.update();
    console.log('update');
    lag -= MS_PER_UPDATE;
  }
  previous = current;
  setImmediate(() => gameLoop(performance.now()));
}

io.on('connection', (socket) => {
  gameLoop(performance.now());
});

io.listen(3000);
