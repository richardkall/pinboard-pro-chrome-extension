const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ZipPlugin = require('zip-webpack-plugin');
const pkg = require('./package.json');

module.exports = {
  mode: 'production',
  entry: {
    background: './src/background.js',
    options: './src/options.js',
    Pinboard: './src/Pinboard.js',
    popup: './src/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/images/**/*', flatten: true },
        {
          from: './src/manifest.json',
          transform(content) {
            const manifest = JSON.parse(content.toString());
            manifest.version = pkg.version;
            return Buffer.from(JSON.stringify(manifest));
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/popup.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      template: './src/options.html',
      filename: 'options.html',
      chunks: ['options'],
    }),
    new ZipPlugin({
      filename: `pinboard-pro-${pkg.version}.zip`,
    }),
  ],
};
