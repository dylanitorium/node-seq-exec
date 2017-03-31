const series = require('./index.js');

// With Promise
series([
  'echo "command one"',
  'echo "command two"',
], null, true).catch(console.error);

// With Callback
series([
  'echo "command three"',
  'echo "command four"',
], (error) => {
  if (error) {
    console.error(error);
  }
}, true);
