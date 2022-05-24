import Ajv from 'ajv';
import schema from './schema.json';
import options from './options.json';

function validateAndGetAttacks() {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);

  if (!validate(options)) return console.log(validate.errors);
  return options.attacks;
}

export default validateAndGetAttacks;
