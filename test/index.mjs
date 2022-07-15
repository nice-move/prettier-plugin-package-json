// eslint-disable-next-line import/no-unresolved
import test from 'ava';
import prettier from 'prettier';

const plugin = await import('../dist/index.cjs');

function formatter(code) {
  return prettier.format(code, {
    plugins: [plugin.default],
    parser: 'package-json',
  });
}

const original = `{
  "name": "prettier-plugin-package-json",

    "author": "abc<abc@example.com>(http://example.com)",

  "main": "./index.js",
  "typings":"",
  "preferGlobal": false,
  "license": "unlicensed",
"repository":{
  "url": "","directory":"m","type": ""
},"resolutions":{
  "b":"","a":""
},"engines":{"node":"d ||    < 5"}
}
`;

const expected = `{
  "name": "prettier-plugin-package-json",
  "version": "0.0.0",
  "license": "Unlicense",
  "author": {
    "name": "abc",
    "email": "abc@example.com",
    "url": "http://example.com"
  },
  "keywords": [],
  "repository": {
    "type": "",
    "url": "",
    "directory": "m"
  },
  "types": "",
  "main": "index.js",
  "resolutions": {
    "a": "",
    "b": ""
  },
  "engines": {
    "node": "d || <5"
  }
}`;

test('Usage', (t) => {
  const actual = formatter(original);

  t.is(actual, expected);
});

test('Empty', (t) => {
  const actual = formatter('{}');

  const minimal = `{
  "name": "",
  "version": "0.0.0",
  "keywords": []
}`;

  t.is(actual, minimal);
});
