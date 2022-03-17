import { resolve } from 'path';

export const config = {
  target: 'node12',
  entry: {
    index: './src/index.mjs',
  },
  output: {
    path: 'dist',
    library: {
      type: 'commonjs2',
    },
  },
  resolve: {
    alias: {
      cosmiconfig: resolve('src/cosmiconfig.cjs'),
    },
  },
  externals: {
    'prettier/parser-babel.js': 'commonjs2 prettier/parser-babel.js',
  },
};
