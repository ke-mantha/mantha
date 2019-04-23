const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

simpleGit.init(() => {
  simpleGit.addRemote('origin', 'https://github.com/ke-mantha/mantha-template-default.git', () => {
    simpleGit.pull('origin', 'master', () => {
      fs.rmdirSync(path.join(process.env.PWD, '.git'));
    })
  })
});
