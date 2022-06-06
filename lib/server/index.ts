import { ServerInterface } from '../shared/serverInterface';
import { Server, ServerOptions } from 'socket.io';
import { Server as httpServer } from 'http';

export { default as Game } from './game/game';
export { default as GameCreator } from './gameCreator';

export const SocketServer = (
  server: httpServer,
  options: Partial<ServerOptions>
): ServerInterface => new Server(server, options);
