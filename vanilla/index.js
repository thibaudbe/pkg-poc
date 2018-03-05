const square = require('./square')
const argv = require('yargs').argv

if (argv.digit) {
  const obj = {
    square: square(argv.digit),
  }

  console.log(obj)
} else {
  console.log('Hmmm. I\'m confused')
}

