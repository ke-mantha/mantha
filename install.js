const shell = require('shelljs');

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

const path = require('path');
const pjson = require('./package.json');

const packageName = pjson.name;

const projectDir = process.cwd().replace(path.join('node_modules', packageName), '');
const tmpDirName = '.tmpdir';
const entryFileName = 'install.js';
const tmpDirPath = path.join(__dirname, tmpDirName);
const entryFilePath = path.join(__dirname, entryFileName);

function entry() {
  // clearConsole();
  cloneTemplate('default');
  copyTemplate();
  cleanTheMess();
  final();
}

function clearConsole() {
  // Clear console
  process.stdout.write('\x1B[2J\x1B[0f');
}

function cloneTemplate(name) {
  console.log(`Installing template...`);
  if (shell.exec(`git clone https://github.com/ke-mantha/mantha-template-${name}.git ${tmpDirName} --quiet`).code !== 0) {
    shell.echo('Error: Git template clone failed');
    shell.exit(1);
  }
  console.log('');
}

function filesToCopy(list = []) {
  const result = [];
  list.forEach(el => {
    result.push(path.join(tmpDirPath, el));
  });
  return result;
}

function copyTemplate(dest = projectDir) {
  console.log(`Deploying template...`);
  shell.cp('-Rf', filesToCopy([
    '.*',
    '*'
  ]), dest);
  console.log('');
}

function cleanTheMess() {
  console.log(`Cleaning the mess...`);
  shell.rm('-rf', tmpDirPath);
  shell.rm(entryFilePath);
  console.log('');
}

function final() {
  console.log('Installing environment...');
  var child_process = require('child_process');
  child_process.execSync(`cd ${projectDir} && npm i`, { stdio: [0, 1, 2] });
}

entry();
