import RectObject, { Rect } from './rectangle';
import InputHandler from './inputs';
import { Keys } from '@shared/interface';
import Player from './player';
import FightBox from './fightBox';
import BoneWave from './boneWave';
import JsonData from '../gameShared/jsonData';
import { State } from '@shared/stateInterface';
import { ServerInterface } from '@shared/serverInterface';
import { Server } from 'socket.io';

enum GameState {
  running,
  stopped,
}

class Game {
  private screen: Rect;
  private jsonData: JsonData;
  private fightBox: FightBox;
  private keys: Keys;
  private player: Player;
  private bonesWave: BoneWave;
  private previous: number;
  private lag: number;
  private FPS = 60;
  private MS_PER_UPDATE = 1000 / this.FPS;
  private io: Server;
  private gameState: GameState;

  constructor(width: number, height: number, io: ServerInterface) {
    const screenObject = new RectObject(width, height);
    const screenPos = {
      x: 0,
      y: 0,
    };
    this.screen = screenObject.getRect({ topLeft: screenPos });
    this.jsonData = new JsonData();
    const inputHandler = new InputHandler();
    this.keys = inputHandler.keys;
    this.fightBox = new FightBox(this.screen);
    this.player = new Player(this.fightBox.innerBox);
    this.bonesWave = new BoneWave(this.jsonData.bonesData);
    this.previous = performance.now();
    this.lag = 0;
    this.io = io;
    this.gameState = GameState.stopped;
  }

  startGame() {
    this.gameState = GameState.running;
    this.loopGame();
  }

  stopGame() {
    this.gameState = GameState.stopped;
  }

  restart() {
    this.jsonData.reloadFile();
    this.bonesWave.restart(this.jsonData.bonesData);
  }

  loopGame() {
    if (this.gameState == GameState.stopped) return;
    const current = performance.now();
    const timeDiffrence = current - this.previous;
    this.lag += timeDiffrence;
    while (this.lag >= this.MS_PER_UPDATE) {
      this.update();
      const gameState = this.getState();
      this.io.emit('sendState', gameState);
      this.lag -= this.MS_PER_UPDATE;
    }
    this.previous = current;
    setImmediate(() => this.loopGame());
  }

  update() {
    this.player.update(this.keys);
    this.bonesWave.update();
  }

  getState(): State {
    const playerPos = { x: this.player.rect.x, y: this.player.rect.y };
    const boneStates = this.bonesWave.getBoneStates();
    const state = { playerPos, boneStates };
    return state;
  }
}

export default Game;
