const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point is the main JavaScript file (app.js) inside the work folder
  entry: './frontend/work/app.js',

  // Output the bundled file to the static directory which Flask will serve
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'frontend/static'),
  },

  // Resolve '.js' extensions and set the alias for easier imports if necessary
  resolve: {
    extensions: ['.js'],
    alias: {
      // Example alias: This is not needed unless you want simpler imports
      Admin: path.resolve(__dirname, 'frontend/work/admin/'),
      Teacher: path.resolve(__dirname, 'frontend/work/teacher/'),
      Student: path.resolve(__dirname, 'frontend/work/student/')
    }
  },

  // Module rules for handling JavaScript and CSS files
  module: {
    rules: [
      {
        // Babel loader for transpiling JavaScript
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        // Loaders for CSS files
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  // Plugins for HTML and possibly other tasks
  plugins: [
    // This plugin will generate an HTML5 file that includes all webpack bundles
    new HtmlWebpackPlugin({
      // Using the admin_dashboard.html as a template to include the script tags
      template: './frontend/templates/admin_dashboard.html',
      // The output HTML filename
      filename: '../../templates/admin_dashboard.html',
      // Injects the script tag at the bottom of the body element
      inject: 'body'
    })
  ],

  // Development server configuration
  devServer: {
    // The directory where webpack will serve your files
    contentBase: path.join(__dirname, 'frontend/static'),
    // Open the browser after server has been started
    open: true,
    // Port where dev server will run (default is 8080)
    port: 3000,
    // Enable Hot Module Replacement
    hot: true,
    // Configure it to be accessed remotely
    host: '0.0.0.0',
    // Setup as a middleware for Flask server
    proxy: {
      '/': 'http://localhost:5000'
    }
  }
};
