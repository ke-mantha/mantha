const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const ncp = require('ncp').ncp;

const projectDir = path.join(process.cwd(), '../../../');
const tmpDirName = '.tmpdir';
const tmpDirPath = path.join(projectDir, tmpDirName);

fs.mkdirSync(tmpDirPath);

const simpleGit = require('simple-git')(tmpDirPath);

simpleGit.init(() => {
  console.log(`installing template...`);
  console.log('ok');
  console.log('');
  simpleGit.addRemote('origin', 'https://github.com/ke-mantha/mantha-template-default.git', () => {
    simpleGit.pull('origin', 'master', {}, () => {
      console.log(`removing .git...`);
      rimraf(path.join(tmpDirPath, '.git'), () => {
        console.log('ok');
        console.log('');
        console.log('copying files...');
        ncp(path.join(tmpDirPath, '.'), projectDir, function (err) {
          if (err) {
            return console.error(err);
          }
          console.log('ok');
          console.log('');
          console.log(`removing temp dir at ${tmpDirPath} ...`);
          rimraf(tmpDirPath, () => {
            console.log('ok');
            console.log('');
            rimraf(path.join(projectDir, 'package-lock.json'), () => {
              rimraf(path.join(projectDir, 'node_modules'), () => {
                console.log('installing environment...');
                var child_process = require('child_process');
                child_process.execSync(`cd ${projectDir} && npm i`, {stdio:[0,1,2]});  
              });
            });
          });
        });
      });
    })
  })
});
