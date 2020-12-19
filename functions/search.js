const { spawn } = require('child_process');

exports.handler = function (event, context, callback) {
  return new Promise(function (success, nosuccess) {
    const python = spawn('/usr/bin/python3', [
      './main.py',
      'ofKDkJKXSKZXu5xJNGiiBQ',
      'False',
    ]);

    python.stdout.on('data', function (data) {
      success(data);
    });

    python.stdout.on('data', (data) => {
      nosuccess(data);
    });
  });
};
