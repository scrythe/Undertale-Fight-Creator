import Ajv, { ValidateFunction } from 'ajv';
import schema from './schema.json';
import { Schema } from './interfaces';
import options from './options.json';

class JsonData {
  private ajv: Ajv;
  private schema = schema;
  private validate: ValidateFunction<Schema>;
  private data: Schema;
  private defaultOptions: Schema = {
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

  constructor() {
    this.ajv = new Ajv();
    this.validate = this.ajv.compile(this.schema);
    this.data = this.validateData(options);
  }

  private validateData(options: Schema): Schema {
    const valid = this.validate(options);
    if (!valid) return this.defaultOptions;
    return options;
  }

  get attacks() {
    return this.data.attacks;
  }
}

export default JsonData;
