const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin= require('mini-css-extract-plugin');
const copyPlugin = require('copy-webpack-plugin');
const dotEnv = require('dotenv-webpack');



module.exports = {
    mode: 'development', // LE INDICO EL MODO EXPLICITAMENTE
    watch: true,
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'dist'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: '[name].[contenthash].js', 
        // EL NOMBRE DEL ARCHIVO FINAL,
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'], // LOS ARCHIVOS QUE WEBPACK VA A LEER
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    module: {
        // REGLAS PARA TRABAJAR CON WEBPACK
        rules : [
            {
                test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
                exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css|.styl$/i,
                use:[miniCssExtractPlugin.loader, 
                'css-loader',
                'stylus-loader'
                ]
            },
            {
                test: /\.png/,
                type:'asset/resource',
            },
            {
                test:/\.(woff|woff2)$/,//es para las fuentes descargadas dentro del ordenador
                use: {
                    loader: 'url-loader',
                    options:{
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false
                    }
                    
                }
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            inject:true,
            template: './public/index.html',
            filename: './index.html',
        }),
        new miniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new copyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, "src","assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new dotEnv(),
    ],
}