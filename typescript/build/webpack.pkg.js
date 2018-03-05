const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { exec } = require('pkg')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const config = {
  target: 'node',
  mode: 'development',
  entry: path.join(__dirname, '../app/index.ts'),
  externals: [
    /^[a-z\-0-9]+$/
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './'),
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.webpack.js', '.ts'],
    modules: [
      'node_modules',
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.json'
        },
      },
    ],
  },
  plugins: [
    new UglifyJsPlugin(),
  ],
}

const compiler = webpack(config)

compiler.run((err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }

  console.log('\nBundle created.\n')
  createPackage()
    .then(() => console.log('\nPackages created.\n'))
    .catch(err => { throw err })
})

async function createPackage() {
  return await exec([ '.', '--out-path', 'dist/' ])
  // return await exec([ '.', '-o', 'dist/app' ])
}
