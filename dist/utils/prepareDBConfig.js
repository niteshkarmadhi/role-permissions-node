"use strict";

var inquirer = require('inquirer');
var questions = [{
  type: 'input',
  name: 'dbname',
  message: 'Enter the database name:'
}, {
  type: 'input',
  name: 'user',
  message: 'Enter the database user:'
}, {
  type: 'password',
  name: 'password',
  message: 'Enter the database password:'
}];
function init() {
  console.log('called');
  // inquirer.prompt(questions).then(answers => {
  //     console.log('Database Name:', answers.dbname);
  //     console.log('Database User:', answers.user);
  //     console.log('Database Password:', answers.password);
  //     // Yaha aap jo bhi processing karni hain woh kar sakte hain
  //   }).catch(err => {
  //     console.log('error', err)
  //   });
}
init();