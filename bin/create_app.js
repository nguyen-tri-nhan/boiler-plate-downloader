#! /usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx @nguyen-tri-nhan/test-boilerplate my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const GIT_REPO = 'https://github.com/nguyen-tri-nhan/sample_template.git';

if (projectName !== '.') {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(projectName);
      console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
    } else {
      console.log(err);
    }
    process.exit(1);
  }
}

async function main() {
  try {
    console.log(`This project template is created by Nguyen Tri Nhan`);
    console.log(`You can find him at: https://github.com/nguyen-tri-nhan`);
    console.log('Downloading files...');
    execSync(`git clone --depth 1 ${GIT_REPO} ${projectPath}`);
    if (projectName !== '.') {
      process.chdir(projectPath);
    }

    console.log('Removing useless files');
    execSync('npx rimraf ./.git');
    execSync('npx rimraf ./bin');
    execSync('npx rimraf ./.github/workflows');

    console.log('The installation is done, this is ready to use !');
    console.log('Happy coding !');
  } catch (error) {
    console.log(error);
  }
}

main();