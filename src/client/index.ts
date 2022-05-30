import Game from './game';
import './customCtx';
import { ClientInterface } from 'shared/serverInterface';
import { io } from 'socket.io-client';

const WIDTH = 960;
const HEIGHT = 720;
const canvas = document.querySelector('canvas')!;
canvas.width = WIDTH;
canvas.height = HEIGHT;
const ctx = canvas.getContext('2d')!;

const socket: ClientInterface = io('http://localhost:3000');

const game = new Game(ctx, WIDTH, HEIGHT);

socket.on('connect', () => {
  socket.on('sendState', (state) => {
    game.draw(state);
  });
});
