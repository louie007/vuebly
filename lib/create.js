const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');
const colors = require("colors/safe");

module.exports = (args, options, logger) => {
  const projectName = args.projectName
  const templatePath = `${__dirname}/../templates`;
  const localPath = `${process.cwd()}/${projectName}`;

  if (fs.existsSync(localPath)) {
    logger.error(`ERROR: ${localPath} already exists.`)
    process.exit(1);
  }

  if (!fs.existsSync(templatePath)) {
    logger.error(`ERROR: The requested template wasn't found.`)
    process.exit(1);
  }

  if (!shell.which('git')) {
    logger.error(`ERROR: This tool requires git, please install it.`);
    process.exit(1);
  }

  let questions = require(`${templatePath}/inquirer-questions.js`);

  if (options.templateUrl) {
    // Clone template
    if (shell.exec(`git clone ${options.templateUrl} ${localPath}`).code !== 0) {
      logger.error('ERROR: Git clone template failed, please try again.');
      process.exit(1);
    } else {
      questions = require(`${localPath}/inquirer-questions.js`);
    }
  }

  logger.info('Please fill the following info:');

  // Ask for variable values
  inquirer.prompt(questions).then(answers => {
    // DEBUG
    // logger.info(answers);
    logger.info('Generating project files ...');

    // Copying files from template
    if (fs.existsSync(templatePath)) {
      // logger.info('Copying files from template ...');
      shell.mkdir('-p', localPath);
      shell.cp('-R', `${templatePath}/*`, localPath);
      // logger.info(`✔ The files have been copied to project dir: ${localPath}`);
      // Delete unused codes
      if (options.ios && !options.android) {
        if (fs.existsSync(`${localPath}/android`)) {
          shell.rm('-rf', `${localPath}/android`);
        }
      }
      if (!options.ios && options.android) {
        if (fs.existsSync(`${localPath}/ios`)) {
          shell.rm('-rf', `${localPath}/ios`);
        }
      }
    } else {
      logger.error(`ERROR: The requested template wasn't found.`)
      process.exit(1);
    }

    if (fs.existsSync(`${localPath}/inquirer-questions.js`)) {
      shell.rm(`${localPath}/inquirer-questions.js`);
    }

  	if (answers.license !== 'MIT') {
      if (fs.existsSync(`${localPath}/LICENSE`)) {
        shell.rm(`${localPath}/LICENSE`);
      }
    }

    // Delete .git folder
    if (fs.existsSync(`${localPath}/.git`)) {
      shell.rm('-rf', `${localPath}/.git`);
    }

    // Replace variable values in all files
    shell.cd(localPath);
    shell.ls('-Rl', '.').forEach(entry => {
      if (entry.isFile()) {
        // Replace '[VARIABLE]` with the corresponding variable value from the prompt
        for (const key in answers) {
          shell.sed('-i', `\\[${key.toUpperCase()}\\]`, answers[key], entry.name);
        }
        // Replace '[NAME]` with Project name
        shell.sed('-i', `\\[NAME\\]`, projectName, entry.name);
        // Insert current year in files
        shell.sed('-i', '\\[YEAR\\]', new Date().getFullYear(), entry.name);
      }
    });
    shell.cd('..');

    logger.info(`Project created at ${localPath}`);
  });

};
