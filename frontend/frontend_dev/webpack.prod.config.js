const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');


module.exports = {
    mode: "production",
    entry: "./src/index.js",
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
                include: /public/,
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
                template: "./public/index.html",
                title: 'Video Hosting PWA',
                favicon: "./public/images/icons/favicon-96x96.png"
            }
        ),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true

        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    to: "",
                    globOptions: {
                        ignore: [
                            '**/public/index.html',
                        ]
                    }
                },
            ],
            options: {
                concurrency: 100,
            },
        }),
    ]
}