const webpack = require("webpack");
const path = require("path");

let entry = {
  bundle: [path.join(__dirname, "src", "client.js")]
};

let plugins = [
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
  })
];

module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    publicPath: "/static/"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: plugins,
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    watchContentBase: true
  }
};
