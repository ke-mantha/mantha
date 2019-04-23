const fs = require('fs');
const path = require('path');

const tmpDirName = '$_tmp-dir';
const tmpDirPath = path.join(process.env.PWD, tmpDirName);

fs.mkdirSync(tmpDirPath);

const simpleGit = require('simple-git')(tmpDirPath);

simpleGit.init(() => {
  simpleGit.addRemote('origin', 'https://github.com/ke-mantha/mantha-template-default.git', () => {
    simpleGit.pull('origin', 'master', {}, () => {
      console.log(`rmdirSync ${path.join(tmpDirPath, '.git')} ...`);
      fs.rmdirSync(path.join(tmpDirPath, '.git'));
      console.log('ok');
      console.log('copyFileSync...');
      fs.copyFileSync(path.join(tmpDirPath, '*'), process.env.PWD);
      console.log('ok');
      console.log(`rmdirSync ${tmpDirPath} ...`);
      fs.rmdirSync(tmpDirPath);
      console.log('ok');
    })
  })
});
