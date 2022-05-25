import Ajv, { ValidateFunction } from 'ajv';
import schema from './schema.json';
import { Schema } from './interfaces';
import options from './options.json';

const defautlSchema: Schema = {
  $schema: './schema.json',
  attacks: [
    {
      speed: {
        x: 0,
        y: -2,
      },
      end: 50,
    },
  ],
};

class JsonData {
  private ajv: Ajv;
  private validate: ValidateFunction<Schema>;
  private data: Schema;

  constructor() {
    this.ajv = new Ajv();
    this.validate = this.ajv.compile(schema);
    this.data = this.validateData(options);
  }

  private validateData(options: Object): Schema {
    const valid = this.validate(options);
    if (!valid) return defautlSchema;
    return options;
  }

  get attacks() {
    return this.data.attacks;
  }
}

export default JsonData;
