/*
 * An Inquirer questions array which contains variables to replace
 * --------------------
 * They are asked to the user as they appear here.
 * User input will replace the placeholder values
 * in the template files
 */

module.exports = [
  {
    type: 'input',
    name: 'author',
    message: 'Author name:'
  },
  {
    type: 'input',
    name: 'version',
    message: 'Project version:',
    default: function () {
      return '1.0.0';
    }
  },
  {
    type: 'input',
    name: 'license',
    message: 'Project license:',
    default: function () {
      return 'MIT';
    }
  }
];
