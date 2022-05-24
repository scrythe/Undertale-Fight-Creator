export interface Position {
  x: number;
  y: number;
}

export type Speed = Position;

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

export interface FightBoxType<Rect> {
  inner: Rect;
  outer: Rect;
}

export interface HeartMap<RedHeart, BlueHeart> {
  RedHeart(): RedHeart;
  BlueHeart(): BlueHeart;
}

export type HeartType<RedHeart, BlueHeart> = keyof HeartMap<
  RedHeart,
  BlueHeart
>;

export interface Attack {
  speed: Speed;
  end: number;
}

export interface Schema {
  $schema: string;
  attacks: Attack[];
}
