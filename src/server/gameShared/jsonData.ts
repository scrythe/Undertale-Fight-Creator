import Ajv, { ValidateFunction } from 'ajv';
import schema from './schema.json';
import { BoneData, Schema } from 'shared/interface';
import attackData from './attackData.json';
import { writeFile } from 'fs';
import { join } from 'path';

class JsonData {
  private ajv: Ajv;
  private schema = schema;
  private validate: ValidateFunction<Schema>;
  private data: Readonly<Schema>;
  private defaultAttackData: Schema = {
    $schema: './schema.json',
    bonesData: [
      {
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
      },
    ],
  };

  constructor() {
    this.ajv = new Ajv();
    this.validate = this.ajv.compile(this.schema);
    this.data = Object.freeze(this.validateData(attackData));
  }

  private validateData(attackData: Schema): Schema {
    const valid = this.validate(attackData);
    if (!valid) return this.defaultAttackData;
    return attackData;
  }

  addNewBone(bone: BoneData) {
    this.data.bonesData.push(bone);
    const dataString = JSON.stringify(this.data, null, 2);
    const dataPath = join(__dirname, 'attackData.json');
    writeFile(dataPath, dataString, (err) => {
      if (err) throw err;
    });
  }

  getbonesData() {
    return [...this.data.bonesData];
  }
}

export default JsonData;
