const { parsers } = require('prettier/parser-babel');
const { normalize } = require('./normalize.cjs');

module.exports = {
  name: 'prettier-plugin-package-json',
  parsers: {
    'package-json': {
      ...parsers['json-stringify'],
      preprocess: normalize,
    },
  },
};
