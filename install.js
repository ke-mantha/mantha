const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git')(path.join(process.env.PWD, '$_tmp-dir'));

simpleGit.init(() => {
  simpleGit.addRemote('origin', 'https://github.com/ke-mantha/mantha-template-default.git', () => {
    simpleGit.pull('origin', 'master', () => {
      fs.rmdirSync(path.join(process.env.PWD, '$_tmp-dir', '.git'));
      fs.copyFileSync(path.join(process.env.PWD, '$_tmp-dir'), process.env.PWD);
      fs.rmdirSync(path.join(process.env.PWD, '$_tmp-dir'));
    })
  })
});
