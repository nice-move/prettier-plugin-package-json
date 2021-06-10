# @nice-move/prettier-plugin-package-json

A [prettier] plugin to make `package.json` prettier.

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[prettier]: https://prettier.io/
[npm-url]: https://www.npmjs.com/package/@nice-move/prettier-plugin-package-json
[npm-badge]: https://img.shields.io/npm/v/@nice-move/prettier-plugin-package-json.svg?style=flat-square&logo=npm
[github-url]: https://github.com/airkro/nice-move/tree/master/packages/prettier-plugin-package-json
[github-badge]: https://img.shields.io/npm/l/@nice-move/prettier-plugin-package-json.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/@nice-move/prettier-plugin-package-json.svg?style=flat-square&colorB=green&logo=node.js

Read about [npm-package.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-json).

## Installation

```bash
npm install prettier @nice-move/prettier-plugin-package-json --save-dev
```

## Usage

```json
// .prettierrc.json
{
  "overrides": [
    {
      "files": "package.json",
      "options": {
        "parser": "package-json"
      }
    }
  ]
}
```

```bash
prettier --write **/package.json
```

## Feature

[normalize-package-data]: https://github.com/npm/normalize-package-data
[normalize-package-bin]: https://github.com/npm/npm-normalize-package-bin

- Normalize by [normalize-package-data] and [normalize-package-bin]
- Sort `package.json` fields in a preset order
- Expand `author` and `contributors` fields into objects
- Remove deprecated fields like `preferGlobal`, `engineStrict`
- Merge `bundleDependencies` into `bundledDependencies`
- Rename `esnext` / `jsnext` to `module`, rename `typings` to `types`
- Differentiate `UNLICENSED` and `Unlicense` license by `private`
