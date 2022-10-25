const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devServer: {
        static: path.resolve(__dirname, "./src"),
        hot: true,
        open: false,
        historyApiFallback: true,
        port: 8080,
        allowedHosts: "all",
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
                title: 'Video Hosting PWA',
                favicon: "./src/images/icons/favicon-96x96.png"
            }
        ),
        new WorkboxPlugin.GenerateSW({
              clientsClaim: true,
              skipWaiting: true
            }),
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