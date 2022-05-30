import RectObject, { Rect } from './rectangle';
import InputHandler from './inputs';
import { Keys, BoneData } from './interfaces';
import Player from './player';
import FightBox from './fightBox';
import BoneWave from './boneWave';
import JsonData from './jsonData';

class Game {
  private screen: Rect;
  private jsonData: JsonData;
  private fightBox: FightBox;
  private keys: Keys;
  private player: Player;
  private bonesWave: BoneWave;

  constructor(width: number, height: number) {
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
  }

  update() {
    this.player.update(this.keys);
    this.bonesWave.update();
  }
}

export default Game;
