import { resolve } from 'node:path';

export const config = {
  target: 'node20',
  entry: {
    index: './src/index.mjs',
  },
  output: {
    path: 'dist',
    module: true,
    library: {
      type: 'module',
    },
  },
  resolve: {
    alias: {
      cosmiconfig: resolve('src/cosmiconfig.cjs'),
    },
  },
  externals: {
    'prettier/parser-babel.js': 'node-commonjs prettier/parser-babel.js',
    'spdx-license-ids/deprecated': 'node-commonjs spdx-license-ids/deprecated',
    'spdx-license-ids': 'node-commonjs spdx-license-ids',
    'spdx-exceptions': 'node-commonjs spdx-exceptions'
  },
};
