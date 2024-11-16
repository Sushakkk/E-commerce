const path = require('path');

const isProd = process.env.NODE_ENV === 'production'; 
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');



const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getSettingsForStyles = (withModules = false) => {

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
    entry: path.join(srcPath, 'main.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool : isProd? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: "bundle.js",
        publicPath: '/',
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
        },
        {
            test: /\.(png|svg|jpg|jpeg)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024
                }
            }
        },
        {
            test: /\.(woff2?|eot|ttf|otf)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]',
                },
              },
            ],
          },
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
                    modules: path.join(srcPath, 'modules'),
                    
                }
            },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        static: {
            directory: path.resolve(__dirname, 'public'), 
        },
        hot: true, 
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, 'index.html'),
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        
        isProd && new MiniCssExtractPlugin({
          
          filename: '[name]-[hash].css',
        }),
        new TsCheckerPlugin ()
      ].filter(Boolean),
}