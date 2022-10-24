const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devServer: {
        hot: true,
        open: false,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "../frontend_prod"),
        publicPath: '',
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|mp4|ico|jpe?g|gif)$/,
                include: /src/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/'
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./src/index.html",
                favicon: "./src/images/icons/favicon-96x96.png"
            }
        ),
        new CopyWebpackPlugin({
            patterns: [
              { from: "src/images/icons", to: "images/icons/" },
              "src/manifest.json",
            ],
            options: {
              concurrency: 100,
            },
          }),
    ]
}