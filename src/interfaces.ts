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
