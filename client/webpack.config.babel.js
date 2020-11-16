import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import chalk from 'chalk';

const config = {
  mode: 'development',
  devServer: {
    port: process.env.PORT || 8080,
    contentBase: './src',
    historyApiFallback: false,
  }, 
  entry: './src/index.js',
  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[id].[hash].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        enforce: 'pre',
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
            eslintPath: 'eslint-config-airbnb-standard/node_modules/eslint',
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
              publicPath: '../',
            },
          },
          { 
            loader: 'css-loader', 
            options: { 
              url: true,
              importLoaders: 2,
            } 
          }, 
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sassOptions: {
                outputStyle: 'compressed',
                sourceMap: true,
                sourceMapContents: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: './static/images/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: './static/fonts/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(webm|mp4)$/,
        loader: 'url-loader',
        options: {
          name: './static/videos/[name].[hash].[ext]',
        },
      },
    ],
  },  
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    new CleanWebpackPlugin(),    
    new ProgressBarPlugin({
      format: `  build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`,
      clear: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'robots.txt'),
          to: 'robots.txt',
        }
      ]
    }),
  ],
}

export default config;