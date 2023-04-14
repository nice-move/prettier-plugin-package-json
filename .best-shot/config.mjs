import { resolve } from 'node:path';

export const config = {
  target: 'node16',
  entry: {
    index: './src/index.mjs',
  },
  output: {
    path: 'dist',
  },
  resolve: {
    alias: {
      cosmiconfig: resolve('src/cosmiconfig.cjs'),
    },
  },
  externals: {
    'prettier/parser-babel.js': 'node-commonjs prettier/parser-babel.js',
  },
};
