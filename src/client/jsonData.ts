import Ajv, { ValidateFunction } from 'ajv';
import schema from './schema.json';
import { Schema } from './interfaces';
import attackData from './attackData.json';

class JsonData {
  private ajv: Ajv;
  private schema = schema;
  private validate: ValidateFunction<Schema>;
  private data: Schema;
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

  private validateData(attackData: Schema): Schema {
    const valid = this.validate(attackData);
    if (!valid) return this.defaultAttackData;
    return attackData;
  }

  get bonesData() {
    return this.data.bonesData;
  }
}

export default JsonData;
