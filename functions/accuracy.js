const { spawn } = require('child_process');

exports.handler = function (event, context, callback) {
  return new Promise(function (success, nosuccess) {
    const python = spawn('/usr/bin/python3', [
      './algo/main.py',
      context.user,
      'True',
    ]);

    python.stdout.on('data', function (data) {
      success(data);
    });

    python.stdout.on('data', (data) => {
      nosuccess(data);
    });
  });
};
