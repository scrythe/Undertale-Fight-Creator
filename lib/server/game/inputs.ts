import { Keys } from '../../shared/interface';
import { SocketInterface } from '../../shared/serverInterface';

class InputHandler {
  private _keys: Keys;

  constructor() {
    this._keys = {
      up: { pressed: false },
      right: { pressed: false },
      down: { pressed: false },
      left: { pressed: false },
      fire: { pressed: false },
    };
  }

  switchSocket(socket: SocketInterface) {
    socket.on('sendKey', (pressedKey, value) => {
      this._keys[pressedKey].pressed = value;
    });
  }

  get keys() {
    return this._keys;
  }
}

export default InputHandler;
