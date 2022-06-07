import { Position } from './interface';

export interface PlayerState {
  heartType: 'RedHeart' | 'BlueHeart';
  playerPos: Position;
}

export interface BoneState {
  bonePos: Position;
}

export interface State {
  playerState: PlayerState;
  boneStates: BoneState[];
}
