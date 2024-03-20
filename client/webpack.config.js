const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development', // Set the mode to development
    entry: {
      main: './src/js/index.js', // Entry point for main bundle
      install: './src/js/install.js' // Entry point for install bundle
    },
    output: {
      filename: '[name].bundle.js', // Output file name with dynamic name based on entry key
      path: path.resolve(__dirname, 'dist'), // Output path for bundled files
    },
    plugins: [
      // Webpack plugin to generate html file and inject bundles
      new HtmlWebpackPlugin({
        template: './index.html', // HTML template file
        title: 'Editor' // Title for the generated HTML file
      }),

      // Service worker injection
      new InjectManifest({
        swSrc: './src-sw.js', // Service worker source file
        swDest: 'src-sw.js', // Service worker destination file
      }),
      
      // Creates a manifest.json file for PWA
      new WebpackPwaManifest({
        fingerprints: false, // Disable file name hashing
        inject: true,
        name: 'Editor', // App name
        short_name: 'edit', // Short name for the app
        description: 'Edit your stuff here.', // App description
        background_color: '#225ca3', // Background color
        theme_color: '#225ca3', // Theme color
        start_url: './', // Start URL for the PWA
        publicPath: './', // Public path for assets
        icons: [
          {
            src: path.resolve('src/images/logo.png'), // Icon source file
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'), // Destination path for icons
          },
        ],
      }),

    ],

    module: { // Module configuration for loaders
      rules: [
        {
          test: /\.css$/i, // CSS file rule
          use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
        },
        {
          test: /\.m?js$/, // JavaScript file rule
          exclude: /node_modules/, // Exclude node_modules directory
          use: { // Use babel-loader for transpilation
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'], // Use @babel/preset-env for ES6+ compatibility
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'], // Additional plugins
            },
          },
        },
      ],
    },
  };
};
