import Ajv, { ValidateFunction } from 'ajv';
import schema from './schema.json';
import { BoneData, Schema } from '@shared/interface';
import attackData from './attackData.json';
import { writeFile } from 'fs';
import { join } from 'path';
import { deepFreeze } from '@shared/functions';

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
    this.data = this.validateData(attackData);
  }

  private validateData(attackData: Schema) {
    const valid = this.validate(attackData);
    if (!valid) return this.defaultAttackData;
    return deepFreeze({ ...attackData } as const);
  }

  addNewBone(bone: BoneData) {
    const data = JSON.parse(JSON.stringify(this.data));
    data.bonesData.push(bone);
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
