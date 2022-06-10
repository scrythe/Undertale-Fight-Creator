import { KeyMap, Position } from '../shared/interface';
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
  private hoveredPos?: Position;

  constructor(socket: ClientInterface, canvas: HTMLCanvasElement) {
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

    const canvasPos = canvas.getBoundingClientRect();

    canvas.addEventListener('mousemove', (e) => {
      const x = e.x - canvasPos.x;
      const y = e.y - canvasPos.y;
      this.hoveredPos;
      const pos = { x, y };
      socket.emit('sendPos', pos);
    });
  }
}

export default InputHandler;
