import { Keys } from 'shared/interface';

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

  get keys() {
    return this._keys;
  }

  set up(value: boolean) {
    this._keys.up.pressed = value;
  }

  set right(value: boolean) {
    this._keys.right.pressed = value;
  }

  set down(value: boolean) {
    this._keys.down.pressed = value;
  }

  set left(value: boolean) {
    this._keys.left.pressed = value;
  }

  set fire(value: boolean) {
    this._keys.fire.pressed = value;
  }
}

export default InputHandler;
