import { Keys, KeyMap } from './interfaces';

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

function isOfKeyMap(key: string): key is keyof typeof keyMap {
  return key in keyMap;
}

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

    addEventListener('keydown', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      this._keys[pressedKey].pressed = true;
    });

    addEventListener('keyup', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      this._keys[pressedKey].pressed = false;
    });
  }

  get keys() {
    return this._keys;
  }
}

export default InputHandler;
