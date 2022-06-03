import { createServer } from 'http';
import { Server } from 'socket.io';
import { ServerInterface } from 'shared/serverInterface';
import Game from './game';
import GameCreator from './gameCreator';

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
const gameCreator = new GameCreator();

let previous = performance.now();
let lag = 0;

function gameLoop(current: number) {
  const timeDiffrence = current - previous;
  lag += timeDiffrence;
  while (lag >= MS_PER_UPDATE) {
    game.update();
    const gameState = game.getState();
    io.emit('sendState', gameState);
    lag -= MS_PER_UPDATE;
  }
  previous = current;
  setImmediate(() => gameLoop(performance.now()));
}

gameCreator.addBullets();

io.on('connection', (socket) => {
  gameLoop(performance.now());
});

io.listen(3000);
