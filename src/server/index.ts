import { createServer } from 'http';
import { Server } from 'socket.io';
import { ServerInterface } from 'shared/serverInterface';

const server = createServer();

const options = {
  cors: {
    origin: ['http://localhost'],
  },
};

const io: ServerInterface = new Server(server, options);

io.on('connection', (socket) => {
  console.log('client connection made');
});

io.listen(3000);
