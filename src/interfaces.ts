export interface Position {
  x: number;
  y: number;
}

export interface RectPosition {
  x?: number;
  y?: number;

  top?: number;
  right?: number;
  bottom?: number;
  left?: number;

  topLeft?: Position;
  topRight?: Position;
  bottomLeft?: Position;
  bottomRight?: Position;

  center?: Position;
  midTop?: Position;
  midRight?: Position;
  midBottom?: Position;
  midLeft?: Position;
}

export type Key = { pressed: boolean };

export interface Keys {
  up: Key;
  right: Key;
  down: Key;
  left: Key;
  fire: Key;
}

export interface KeyMap {
  ArrowUp: keyof Keys;
  ArrowRight: keyof Keys;
  ArrowDown: keyof Keys;
  ArrowLeft: keyof Keys;

  w: keyof Keys;
  d: keyof Keys;
  s: keyof Keys;
  a: keyof Keys;

  Enter: keyof Keys;
}
