const path = require('path');

const buildPath = path.resolve(__dirname, 'dist');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'; 
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const srcPath = path.resolve(__dirname, 'src');




const getSettingsForStyles = (withModules = false) => {
    return [
      'style-loader',
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
    entry: path.resolve(srcPath, './index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool : isProd? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, 'index.html')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new TsCheckerPlugin () 
    ].filter(Boolean),
    module: 
{
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
        },
        {
            test: /\.(png|svg|jpg)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024
                }
            }
        },
    ]

},
resolve: {
    // теперь при импорте эти расширения файлов можно не указывать 
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
    host: 'localhost',
    port: 3000,
    hot: true,
    historyApiFallback: true
}
 
}