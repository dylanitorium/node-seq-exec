# node-seq-exec

A small package which assists with executing shell commands in sequence in node.js

## installation

`$ npm install node-seq-exec`

## usage

```
const seriesExec = require('node-seq-exec');

seriesExec([
  'command 1',
  'command 2',
], (error) => {
  if (error) {
    console.error(error);
  }
});
```
