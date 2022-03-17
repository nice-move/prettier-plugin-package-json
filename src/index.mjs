import { parsers as temp } from 'prettier/parser-babel.js';

import { normalize } from './normalize.mjs';

export const name = 'prettier-plugin-package-json';

export const parsers = {
  'package-json': {
    ...temp['json-stringify'],
    preprocess: normalize,
  },
};
