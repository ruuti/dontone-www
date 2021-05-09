const path = require("path");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
  "devServer": {
    "compress": true,
    "contentBase": path.join(
      __dirname,
      "dist"
    ),
    "port": 3000
  },
  "entry": {
    "styles": "./src/styles/style.scss"
  },
  "module": {
    "rules": [
      {
        "test": /\.pug$/,
        "use": ["pug-loader"]
      },
      {
        "test": /\.scss$/,
        "use": [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,

          /*
           * Load the CSS, set url = false to prevent following
           * urls to fonts and images.
           */
          {
            "loader": "css-loader",
            "options": {
              "importLoaders": 1,
              "url": false
            }
          },
          // Add browser prefixes and minify CSS.
          {
            "loader": "postcss-loader",
            "options": {
              "postcssOptions": {
                "plugins": [
                  autoprefixer(),
                  cssnano()
                ]
              }
            }
          },
          // Load the SCSS/SASS
          {
            "loader": "sass-loader"
          }
        ]
      }
    ]
  },
  "output": {
    "filename": "[name].bundle.js",
    "path": path.resolve(
      __dirname,
      "dist"
    )
  },
  "plugins": [
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "inject": false,
      "template": "src/views/index.pug"
    }),
    new HtmlWebpackPlugin({
      "filename": "404.html",
      "inject": false,
      "template": "src/views/404.pug"
    }),
    new CopyWebpackPlugin({
      "patterns": [
        {
          "from": "src/favicon",
          "to": "static"
        }
      ]
    }),
    new CopyWebpackPlugin({
      "patterns": [
        {
          "from": "src/domain_config",
          "to": ""
        }
      ]
    }),
    new MiniCssExtractPlugin({
      "filename": "static/css/style.css"
    })
  ]
};
module.exports = (env, argv) => {

  if (argv.mode === "production") {

    config.output.path = path.resolve(
      __dirname,
      "docs"
    );

  }
  return config;

};
