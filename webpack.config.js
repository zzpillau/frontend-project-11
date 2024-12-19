import path from 'path';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default {
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      }
    ]
  },
  devServer: {
    static: path.resolve(dirname, 'dist'),
    port: 8080,
    hot: true
  }
};
