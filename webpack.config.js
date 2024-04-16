/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const dotEnvModules = require("dotenv");

const appSetting = true;
const appSettingsFile = appSetting
  ? "/config/development.env"
  : "/settings/production.env";
const envFilePath = path.join(__dirname, appSettingsFile);
const dotenv = dotEnvModules.config({
  path: envFilePath,
});
const devMode = process.env.NODE_ENV !== "production"


module.exports = {
  name: "UI",
  mode: "development", //production
  entry: path.join(__dirname, "src", "index.tsx"),
  output: {
    // publicPath: "//",
    publicPath: "/",
    filename: 'widget.[contenthash].js',
    path: path.resolve(__dirname, "build"),
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.parsed),
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
  ],
  devServer: {
    // port: 9000,
    // https: true,
    historyApiFallback: true, // It prevents the reload issue and direct searching by paths.
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              esModule: false
            },
          },
        ]
      },
    ],
  },
 
};