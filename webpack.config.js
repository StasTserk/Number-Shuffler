const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const WebpackPrettierPlugin = require('webpack-prettier-plugin');

const clientSideConfig = {
    name: 'client',
    entry: {
        index: {
            import: './src/client/index.tsx',
            dependOn: ['react', 'react-dom'],
        },
        react: 'react',
        'react-dom': 'react-dom',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/i,
                use: 'html-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|json|ico)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/client/index.html',
        }),
        new ESLintWebpackPlugin({
            extensions: ['ts', 'tsx'],
        }),
        new WebpackPrettierPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist/client'),
        publicPath: '/',
        globalObject: 'this',
        clean: true,
        assetModuleFilename: 'assets/[name][ext]',
    },
    target: 'web',
    stats: 'errors-warnings',
};

const serverSideConfig = {
    name: 'server',
    entry: {
        server: {
            import: './src/server/app.ts',
        },
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist/server'),
        publicPath: '/',
        globalObject: 'this',
        clean: true,
    },
    target: 'node',
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    plugins: [
        new ESLintWebpackPlugin({
            extensions: ['ts', 'tsx'],
        }),
        new WebpackPrettierPlugin(),
    ],
    stats: 'errors-warnings',
};

module.exports = (env, argv) => {
    console.log(`building in ${argv.mode}`);
    if (argv.mode === 'production') {
        clientSideConfig.devtool = false;
    }
    return [clientSideConfig, serverSideConfig];
};
