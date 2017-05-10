const spawn = require('child_process').spawn;

const createError = (command, code) => {
    if (code) {
        const error = new Error(`command ${command} exited with wrong status code ${code}`);
        error.code = code;
        error.command = command;
        return error;
    }
}

const extractProcessArgs = parts => ([
  parts[0],
  parts.slice(1),
  {
    stdio: 'inherit'
  },
]);

const exec = (command, callback, debug) => {
  if (debug) {
    console.log(`Executing ${command}`);
  }

  try {
    spawn(...extractProcessArgs(command.split(/[^\s"']+|"([^"]*)"|'([^']*)'/g))).on('exit', code => (
      callback(createError(command, code))
    ))
  }
  catch(exception) {
    callback(exception);
  }
};

const handleExit = (callback, promise, error) => ((callback) ? callback(error) : promise(error));

const series = (commands, callback, debug) => (
  new Promise((resolve, reject) => {
    const next = () => {
        exec(commands.shift(), (error) => {
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
