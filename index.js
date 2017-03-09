const spawn = require('child_process').spawn;

const createError = (command, code) => {
    if (code) {
        const error = new Error('command "'+ command +'" exited with wrong status code "'+ code +'"');
        error.code = code;
        error.command = command;
        return error;
    }
}

const exec = (command, callback) => {
    console.info('Executing ' + command);
    const parts = command.split(/\s+/g);
    const process = spawn(parts[0], parts.slice(1), {stdio: 'inherit'});
    process.on('exit', function(code){
        if (callback) {
            callback(createError(command, code));
        }
    });
};

const series = (commands, callback) => {
    const executeNext = () => {
        exec(commands.shift(), function(error){
            if (error) {
                callback(error);
            } else {
                if (commands.length) {
                    executeNext();
                } else {
                    callback(null);
                }
            }
        });
    };
    executeNext();
};

module.exports = series;
