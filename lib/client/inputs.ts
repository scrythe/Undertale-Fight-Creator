import { KeyMap } from '../shared/interface';
import { ClientInterface } from '../shared/serverInterface';

const keyMap: KeyMap = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down',
  ArrowLeft: 'left',

  w: 'up',
  d: 'right',
  s: 'down',
  a: 'left',

  Enter: 'fire',
};

function isOfKeyMap(key: string): key is keyof KeyMap {
  return key in keyMap;
}

class InputHandler {
  constructor(socket: ClientInterface) {
    addEventListener('keydown', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      socket.emit('sendKey', pressedKey, true);
    });

    addEventListener('keyup', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      socket.emit('sendKey', pressedKey, false);
    });
  }
}

export default InputHandler;
