import test from 'ava';
import { format } from 'prettier';

import * as plugin from '../dist/index.mjs';

async function formatter(t, code) {
  const output = await format(code, {
    plugins: [plugin],
    parser: 'package-json',
  });

  t.snapshot(output);
}

const original = `{
  "name": "prettier-plugin-package-json ",

    "author": "abc<abc@example.com>(http://example.com)",

  "main": "./index.js",
  "typings":"","keywords":["o","c"],
  "preferGlobal": false,
  "license": "unlicensed ",  "workspaces":["ff/*","ff/*","a/*"],
  "files":["l","l","a"],"version"          :"   ",
"repository":{
  "url": "","directory":"m","type": ""
},"resolutions":{
  "b":"","a":""
},"engines":{"node":"d || ^7||   ^4 ||   < 5","npm":"  4|| >  8"}
}
`;

test('Usage', formatter, original);

test('Empty', formatter, '{}');
