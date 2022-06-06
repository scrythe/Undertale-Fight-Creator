import { Keys, KeyMap } from '../shared/interface';

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

function sendKey(pressedKey: keyof Keys, value: boolean) {
  console.log(`${pressedKey} is ${value}`);
}

class InputHandler {
  constructor() {
    addEventListener('keydown', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      sendKey(pressedKey, true);
    });

    addEventListener('keyup', ({ key }) => {
      if (!isOfKeyMap(key)) return;
      const pressedKey = keyMap[key];
      sendKey(pressedKey, false);
    });
  }
}

export default InputHandler;
