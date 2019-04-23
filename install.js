const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

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
      fs.copyFileSync(path.join(tmpDirPath, '*'), process.env.PWD);
      console.log('ok');
      console.log(`rimraf ${tmpDirPath} ...`);
      rimraf.sync(tmpDirPath);
      console.log('ok');
    })
  })
});
