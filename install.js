const fs = require('fs');
const path = require('path');

const tmpDirName = '$_tmp-dir';
const tmpDirPath = path.join(process.env.PWD, tmpDirName);

fs.mkdirSync(tmpDirPath);

const simpleGit = require('simple-git')(tmpDirPath);

simpleGit.init(() => {
  simpleGit.addRemote('origin', 'https://github.com/ke-mantha/mantha-template-default.git', () => {
    simpleGit.pull('origin', 'master', () => {
      fs.rmdirSync(path.join(tmpDirPath, '.git'));
      fs.copyFileSync(tmpDirPath, process.env.PWD);
      fs.rmdirSync(tmpDirPath);
    })
  })
});
