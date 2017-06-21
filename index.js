const exec = require('child_process').exec;

const execute = (command, callback) => {
  console.log(`Executing '${command}'...`);

  try {
    exec(command, (error, stdout, stderr) => {
      if(error) {
        callback(error);
      }

      if (stderr) {
        console.error(stderr);
      }

      console.log(stdout);
    });
  }
  catch(exception) {
    callback(exception);
  }
};

const handleExit = (callback, promise, error) => ((callback) ? callback(error) : promise(error));

const series = (commands, callback) => (
  new Promise((resolve, reject) => {
    const next = () => {
      execute(commands.shift(), (error) => {
        if (error) {
            return handleExit(callback, reject, error);
        } else {
            return commands.length ? next() : handleExit(callback, resolve);
        }
      }, true);
    };
    next();
  })
);

module.exports = series;
