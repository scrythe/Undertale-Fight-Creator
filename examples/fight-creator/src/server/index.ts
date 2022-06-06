import { createServer } from 'http';
import {
  Game,
  SocketServer as Server,
} from 'undertale-fight-creator/dist/server';

const server = createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io = Server(server, options);

const game = new Game(io);
game.startGame();

io.on('connection', (socket) => {
  socket.on('startGame', () => {
    game.restart();
  });
});

io.listen(3000);
