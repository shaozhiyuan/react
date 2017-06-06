/**
 * Created by 邵志远 on 2017/6/5.
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        path: __dirname+"/dist",
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".json",".js",".css",".jsx"]
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    }
}