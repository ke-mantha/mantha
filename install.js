const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

const tmpDirName = '.tmpdir';
const tmpDirPath = path.join(process.env.PWD, tmpDirName);

fs.mkdirSync(tmpDirPath);

const simpleGit = require('simple-git')(tmpDirPath);

simpleGit.init(() => {
  simpleGit.addRemote('origin', 'https://github.com/ke-mantha/mantha-template-default.git', () => {
    simpleGit.pull('origin', 'master', {}, () => {
      console.log(`removing .git...`);
      rimraf(path.join(tmpDirPath, '.git'), () => {
        console.log('ok\r');
        console.log('copying files...');
        ncp(path.join(tmpDirPath, '.'), process.env.PWD, function (err) {
          if (err) {
            return console.error(err);
          }
          console.log('ok\r');
          console.log(`removing temp dir at ${tmpDirPath} ...`);
          rimraf(tmpDirPath, () => {
            console.log('ok\r');
            console.log('installing environment...');
            rimraf.sync(path.join(process.env.PWD, 'package-lock.json'));
            const exec = require('child_process').exec;
            child = exec(`cd ${process.env.PWD} && npm i`).stderr.pipe(process.stderr);
          });
        });
      });
    })
  })
});
