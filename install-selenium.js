var chalk = require("chalk");
var selenium = require('selenium-download');
var path = require("path");
var binPath = path.join(__dirname, 'bin');

console.log(binPath)

selenium.ensure(binPath, function (error) {
  if (error){
    console.error(error.stack);
  } else {
    console.log( chalk.green('√ Selenium & Chromedriver downloaded to:', binPath) );
  }
  process.exit(0);
});