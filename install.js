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
      console.log(`rimraf ${path.join(tmpDirPath, '.git')} ...`);
      rimraf.sync(path.join(tmpDirPath, '.git'));
      console.log('ok');
      console.log('copyFileSync...');
      ncp(path.join(tmpDirPath, '.'), process.env.PWD, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('ok');
        console.log(`rimraf ${tmpDirPath} ...`);
        rimraf.sync(path.join(tmpDirPath));
        console.log('ok');
       });
    })
  })
});
