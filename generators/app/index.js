'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');

module.exports = yeoman.Base.extend({
  prompting: function () {
    this.log(yosay(
      chalk.red('Welcome!') + '\n' +
      chalk.yellow('You\'re using the fantastic generator for scaffolding an api application with Hapi!')
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'Your project name',
      validate: function(input) {
        return !_.isEmpty(input) || 'Name shouldn\'t be empty';
      }
    }, {
      type: 'input',
      name: 'projectDescription',
      message: 'Your project description'
    }, {
      type: 'input',
      name: 'projectAuthor',
      message: 'Who is the project author?'
    }, {
      type: 'confirm',
      name: 'addHeroku',
      message: 'Would you like to add Heroku deployment configuration',
      default: false
    }];

    return this.prompt(prompts).then(function(props) {
      console.log(props);
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    var copy = function(filePath) {
      this.fs.copyTpl(
        this.templatePath(filePath),
        this.destinationPath(filePath),
        this.props
      );
    }.bind(this);

    copy('.babelrc');
    copy('.gitignore');
    copy('.editorconfig');
    copy('package.json');
    copy('gulpfile.babel.js');
    copy('src');

    if (this.props.addHeroku) {
      copy('main.js');
      copy('Procfile');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
