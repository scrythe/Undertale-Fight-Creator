const tsj = require('ts-json-schema-generator');
const fs = require('fs');

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const config = {
  path: 'src/schema.ts',
  tsconfig: 'src/tsconfig.json',
  type: 'Schema',
};

const output_path = 'src/schema.json';

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(output_path, schemaString, (err) => {
  if (err) throw err;
});
