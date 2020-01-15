# webpack-config

[![npm version](https://img.shields.io/npm/v/react-figma-webpack-config.svg)](https://www.npmjs.com/package/react-figma-webpack-config)

Webpack config for react-figma projects


## Installation

Install it with yarn:

```
yarn add react-figma-webpack-config html-webpack-inline-source-plugin html-webpack-plugin svg-inline-loader ts-loader webpack webpack-merge -D
```

Or with npm:

```
npm i react-figma-webpack-config html-webpack-inline-source-plugin html-webpack-plugin svg-inline-loader ts-loader webpack webpack-merge -D
```

## Usage

At webpack config:

```javascript
var configure = require('react-figma-webpack-config');

module.exports = configure();
```

Configuration also can be extended:
```javascript
var configure = require('react-figma-webpack-config');

module.exports = configure({
    entry: {
        ui: './src/ui.js', // The entry point for your UI code
        code: './src/code.js' // The entry point for your plugin code
    },
    ...
});
```
