import { Game, SocketClient as io } from 'undertale-fight-creator/dist/client';

const socket = io('http://localhost:3000');

const canvas = document.querySelector('canvas')!;

const game = new Game(canvas);

socket.on('connect', () => {
  socket.emit('startGame');
  socket.on('sendState', (state) => {
    game.draw(state);
  });
});
