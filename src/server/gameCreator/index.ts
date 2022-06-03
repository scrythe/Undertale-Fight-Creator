import JsonData from '../gameShared/jsonData';

class GameCreator {
  jsonData: JsonData;

  constructor() {
    this.jsonData = new JsonData();
  }
  addBullets() {
    const newBone = {
      position: { x: 475, y: 460 },
      start: 0,
      attacks: [
        {
          speed: {
            x: 0,
            y: -2,
          },
          end: 50,
        },
      ],
      end: 50,
    };
    this.jsonData.addNewBone(newBone);
  }
}

export default GameCreator;
