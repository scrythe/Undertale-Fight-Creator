import { Position } from './interface';

export interface BoneState {
  bonePos: Position;
}

export interface State {
  playerPos: Position;
  boneStates: BoneState[];
}
