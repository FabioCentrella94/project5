const path = require("path");
const HtmlBundlerPlugin = require("html-bundler-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CoreJSPlugin } = require("webpack-plugin-corejs");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devServer: {
    compress: true,
    port: 9000,
    open: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  mode: "production",
  entry: {
    index: "./src/index.html",
    singleItem: "./src/singleItem.html",
    cart: "./src/cart.html",
    orderConfirmation: "./src/orderConfirmation.html",
  },
  output: {
    path: __dirname + "/dist",
  },
  plugins: [
    new CoreJSPlugin({ modules: "core-js/es" }),
    new CopyPlugin({
      patterns: [
        { from: "src/images/teddy_1.jpg", to: "images" },
        { from: "src/images/teddy_2.jpg", to: "images" },
        { from: "src/images/teddy_3.jpg", to: "images" },
        { from: "src/images/teddy_4.jpg", to: "images" },
        { from: "src/images/teddy_5.jpg", to: "images" },
      ],
    }),
    new HtmlBundlerPlugin({
      js: {
        filename: "js/[name].[contenthash:8].js",
      },
      css: {
        filename: "style/[name].[contenthash:8].css",
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer", {}]],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|ico|gif)/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      minSize: 5000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].+\.(js)$/,
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new HtmlMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};
