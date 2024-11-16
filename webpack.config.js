const path = require('path');

const isProd = process.env.NODE_ENV === 'production'; 
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');



const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getSettingsForStyles = (withModules = false) => {
  // Заменяем в нашей функции style-loader на mini-css-extract-plugin
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
              namedExport: false,
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

module.exports = {
    entry: path.join(srcPath, 'index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool : isProd? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    module: {
    rules: [
        {
            test: /\.module\.s?css$/,
            use: getSettingsForStyles(true),
          },
          {
            test: /\.s?css$/,
            exclude: /\.module\.s?css$/,
            use: getSettingsForStyles(),
          },
          {
            test: /\.[tj]sx?$/,
            use: 'babel-loader'
        },,
        {
            test: /\.(png|svg|jpg)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024
                }
            }
        }
    ]
    },
    resolve: {

                extensions: ['.tsx', '.jsx', '.js', '.ts'],
                alias: {
                    components: path.join(srcPath, 'components'),
                    config: path.join(srcPath, 'config'),
                    styles: path.join(srcPath, 'styles'),
                    utils: path.join(srcPath, 'utils'),
                    models: path.join(srcPath, 'models'),
                    stores: path.join(srcPath, 'stores'),
                    enums: path.join(srcPath, 'enums'),
                    hooks: path.join(srcPath, 'hooks'),
                    
                }
            },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        static: {
            directory: path.resolve(__dirname, 'public'), // Заменили contentBase на static
        },
        hot: true, // Включаем горячую перезагрузку
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'index.html'),
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        //Добавим плагин в plugins
        isProd && new MiniCssExtractPlugin({
          // Для того чтобы файл со стилями не кэшировался в браузере добавим filename
          filename: '[name]-[hash].css',
        }),
        new TsCheckerPlugin ()
      ].filter(Boolean),
}