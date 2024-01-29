/** @type {import('webpack').Configuration} */
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const NodemonPlugin = require('nodemon-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const NODE_ENV = process.env.NODE_ENV

module.exports = {
  name: 'employees-api',
  entry: {
    index: path.resolve('src', 'index.ts'),
    seed: path.resolve('prisma', 'seed.ts')
  },
  target: 'node',
  mode: NODE_ENV,
  externals: [nodeExternals()],
  output: {
    path: path.resolve('dist'),
    filename: '[name].cjs',
    library: {
      type: 'commonjs'
    }
  },
  resolve: {
    extensions: ['.ts'],
    alias: {
      '@': path.resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      script: path.resolve('dist', 'index.cjs')
    }),
    new Dotenv()
  ]
}
