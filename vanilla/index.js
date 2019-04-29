const argv = require('yargs').argv
const square = require('./square')

if (argv.nb) {
  if (isNaN(argv.nb)) {
    throw Error(`Unable to get square, ${argv.nb} is not a valid number.`)
  }
  console.log(square(argv.nb))
} else {
  console.log('\nArgument is missing.\nex: --nb=5\n')
}
