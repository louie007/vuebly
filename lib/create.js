const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');
const colors = require("colors/safe");

// *templatePath: local template path
// *templateUrl: remote template url
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
      // Delete .git folder
      if (fs.existsSync(`${localPath}/.git`)) {
        shell.rm('-rf', `${localPath}/.git`);
      }
    }
  }

  logger.info('Please fill the following info:');

  // Ask for variable values
  inquirer.prompt(questions).then(answers => {
    // DEBUG
    // logger.info(answers);
    logger.info('Generating project files ...');

    if (!options.templateUrl && fs.existsSync(templatePath)) {
      // logger.info('Copying files from template ...');
      shell.mkdir('-p', localPath);
      shell.cp('-R', `${templatePath}/*`, localPath);
      // logger.info(`✔ The files have been copied to project dir: ${localPath}`);
      // Delete unused codes
    } else {
      logger.error(`ERROR: The requested template wasn't found.`)
      process.exit(1);
    }

    // Goto destination directory: localPath
    shell.cd(localPath);

    if (fs.existsSync(`inquirer-questions.js`)) {
      shell.rm(`inquirer-questions.js`);
    }

  	if (answers.license !== 'MIT') {
      if (fs.existsSync(`LICENSE`)) {
        shell.rm(`LICENSE`);
      }
    }

    if (options.ios && !options.android) {
      if (fs.existsSync(`android`)) {
        shell.rm('-rf', `android`);
      }
    }
    if (!options.ios && options.android) {
      if (fs.existsSync(`ios`)) {
        shell.rm('-rf', `ios`);
      }
    }

    if (fs.existsSync(`android`)) {
      // Replace Android project files
      shell.ls('-Rl', 'android').forEach(entry => {
        if (entry.isFile() && entry.name != 'gradle/wrapper/gradle-wrapper.jar') {
          // Replace template project name with new name
          shell.sed('-i', /Bonjour/g, projectName, `android/${entry.name}`);
          shell.sed('-i', /bonjour/g, projectName.toLowerCase(), `android/${entry.name}`);
        }
      });
      // Rename Android files
      if (fs.existsSync(`android/app/src/main/java/com/vuebly/bonjour`)) {
        shell.mv(`android/app/src/main/java/com/vuebly/bonjour`, `android/app/src/main/java/com/vuebly/${projectName.toLowerCase()}`);
      }
      if (fs.existsSync(`android/app/src/test/java/com/vuebly/bonjour`)) {
        shell.mv(`android/app/src/test/java/com/vuebly/bonjour`, `android/app/src/test/java/com/vuebly/${projectName.toLowerCase()}`);
      }
      if (fs.existsSync(`android/app/src/androidTest/java/com/vuebly/bonjour`)) {
        shell.mv(`android/app/src/androidTest/java/com/vuebly/bonjour`, `android/app/src/androidTest/java/com/vuebly/${projectName.toLowerCase()}`);
      }
    }

    if (fs.existsSync(`ios`)) {
      // Replace iOS project files
      shell.ls('-Rl', 'ios').forEach(entry => {
        if (entry.isFile()) {
          // Replace template project name with new name
          shell.sed('-i', /Bonjour/g, projectName, `ios/${entry.name}`);
        }
      });
      // Rename Android files
      if (fs.existsSync(`ios/Bonjour`)) {
        shell.mv(`ios/Bonjour`, `ios/${projectName}`);
      }
      if (fs.existsSync(`ios/BonjourTests`)) {
        shell.mv(`ios/BonjourTests/BonjourTests.m`, `ios/BonjourTests/${projectName}Tests.m`);
        shell.mv(`ios/BonjourTests`, `ios/${projectName}Tests`);
      }
      if (fs.existsSync(`ios/Bonjour.xcodeproj`)) {
        shell.mv(`ios/Bonjour.xcodeproj`, `ios/${projectName}.xcodeproj`);
      }
    }

    // Replace variable values in all localPath files
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

    logger.info(`Project created at ${localPath}`);
  });

};
