import { createServer } from 'http';
import { Server } from 'socket.io';
import { ServerInterface } from '@shared/serverInterface';
import Game from './game';
// import GameCreator from './gameCreator';

const server = createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io: ServerInterface = new Server(server, options);

const WIDTH = 960;
const HEIGHT = 720;

const game = new Game(WIDTH, HEIGHT, io);
game.startGame();
// const gameCreator = new GameCreator();

// gameCreator.addBullets();

io.on('connection', (socket) => {
  socket.on('startGame', () => {
    game.restart();
  });
});

io.listen(3000);
