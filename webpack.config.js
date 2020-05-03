const path = require("path");

module.exports = {
  entry: "index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  target: "node",
  mode: "production",
  module: {
    rules: [
      { test: /\.ts$/, loaders: ["ts-loader"], exclude: "/node_modules" },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
