const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: "development",
    entry: "./src/index.js",
    devServer: {
        static: path.resolve(__dirname, "./public"),
        liveReload: true,
        hot: true,
        open: false,
        historyApiFallback: true,
        port: 8080,
        allowedHosts: "all",
        client: {
            webSocketURL: {
                hostname: '127.0.0.1',
                pathname: '/ws',
                port: 8080,
                protocol: 'ws',
              },
          },
    },
    resolve: {
        extensions: [".js", ".jsx"],
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
            // {
            //     test: /\.(png|svg|mp4|ico|jpe?g|gif)$/,
            //     include: /public/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 outputPath: 'images/',
            //                 publicPath: 'images/'
            //             }, 

            //         }
            //     ]
            // },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin(
            {
                template: "./public/index.html",
                title: 'Video Hub PWA',
                favicon: "./public/images/icons/favicon-96x96.png"
            }
        )
    ]
}