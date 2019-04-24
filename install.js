const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

console.log('PWD FTW', process.env.PWD);
console.log('HOME FTW', process.env.HOMEPATH);
console.log('env FTW', process.env);

const tmpDirName = '.tmpdir';
const tmpDirPath = path.join(process.env.PWD, tmpDirName);

fs.mkdirSync(tmpDirPath);

const simpleGit = require('simple-git')(tmpDirPath);

simpleGit.init(() => {
  simpleGit.addRemote('origin', 'https://github.com/ke-mantha/mantha-template-default.git', () => {
    simpleGit.pull('origin', 'master', {}, () => {
      console.log(`removing .git...`);
      rimraf(path.join(tmpDirPath, '.git'), () => {
        console.log('ok\r\r');
        console.log('copying files...');
        ncp(path.join(tmpDirPath, '.'), process.env.PWD, function (err) {
          if (err) {
            return console.error(err);
          }
          console.log('ok\r\r');
          console.log(`removing temp dir at ${tmpDirPath} ...`);
          rimraf(tmpDirPath, () => {
            console.log('ok\r\r');
            rimraf(path.join(process.env.PWD, 'package-lock.json'), () => {
              rimraf(path.join(process.env.PWD, 'node_modules'), () => {
                console.log('installing environment...');
                var child_process = require('child_process');
                child_process.execSync(`cd ${process.env.PWD} && npm i`, {stdio:[0,1,2]});  
              });
            });
          });
        });
      });
    })
  })
});
