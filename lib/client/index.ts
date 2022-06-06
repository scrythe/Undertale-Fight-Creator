import { ClientInterface } from '../shared/serverInterface';
import { io } from 'socket.io-client';

export { default as Game } from './game';

export const SocketClient = (uri: string): ClientInterface => io(uri);
